import * as vscode from 'vscode';
import { initializeTelemetryReporter, TelemetryLog } from './telemetry';

// Interface for Django template tag definitions
interface DjangoTag {
    name: string;
    snippet: string;
    description: string;
    documentation?: string;
}

// Comprehensive list of Django template tags with descriptions
const djangoTags: DjangoTag[] = [
    // Control Flow
    {
        name: 'if',
        snippet: '{% if ${1:condition} %}\n\t$2\n{% endif %}',
        description: 'Evaluates a variable against a condition',
        documentation: 'https://docs.djangoproject.com/en/stable/ref/templates/builtins/#if'
    },
    {
        name: 'for',
        snippet: '{% for ${1:item} in ${2:items} %}\n\t$3\n{% endfor %}',
        description: 'Loops over each item in an array',
        documentation: 'https://docs.djangoproject.com/en/stable/ref/templates/builtins/#for'
    },
    {
        name: 'with',
        snippet: '{% with ${1:var}=${2:value} %}\n\t$3\n{% endwith %}',
        description: 'Creates a temporary variable in the template',
        documentation: 'https://docs.djangoproject.com/en/stable/ref/templates/builtins/#with'
    },

    // Template Inheritance
    {
        name: 'extends',
        snippet: '{% extends "${1:base.html}" %}',
        description: 'Specifies parent template',
        documentation: 'https://docs.djangoproject.com/en/stable/ref/templates/builtins/#extends'
    },
    {
        name: 'block',
        snippet: '{% block ${1:name} %}\n\t$2\n{% endblock %}',
        description: 'Defines a block that can be overridden by child templates',
        documentation: 'https://docs.djangoproject.com/en/stable/ref/templates/builtins/#block'
    },

    // Include & Loading
    {
        name: 'include',
        snippet: '{% include "${1:template.html}" %}',
        description: 'Includes content from another template',
        documentation: 'https://docs.djangoproject.com/en/stable/ref/templates/builtins/#include'
    },
    {
        name: 'load',
        snippet: '{% load ${1:static} %}',
        description: 'Loads a custom template tag library',
        documentation: 'https://docs.djangoproject.com/en/stable/ref/templates/builtins/#load'
    },

    // URL Handling
    {
        name: 'url',
        snippet: '{% url "${1:view_name}" %}',
        description: 'Returns URL for a given view function',
        documentation: 'https://docs.djangoproject.com/en/stable/ref/templates/builtins/#url'
    },

    // Static Files
    {
        name: 'static',
        snippet: '{% static "${1:path}" %}',
        description: 'Generates URL for static files',
        documentation: 'https://docs.djangoproject.com/en/stable/ref/templates/builtins/#static'
    },

    // Comments
    {
        name: 'comment',
        snippet: '{% comment "${1:optional note}" %}\n\t$2\n{% endcomment %}',
        description: 'Multi-line template comment',
        documentation: 'https://docs.djangoproject.com/en/stable/ref/templates/builtins/#comment'
    }
];

// Django template filters
const djangoFilters: string[] = [
    'add', 'addslashes', 'capfirst', 'center', 'cut',
    'date', 'default', 'dictsort', 'divisibleby', 'escape',
    'filesizeformat', 'first', 'floatformat', 'force_escape',
    'get_digit', 'join', 'json_script', 'last', 'length',
    'length_is', 'linebreaks', 'linebreaksbr', 'linenumbers',
    'ljust', 'lower', 'make_list', 'phone2numeric', 'pluralize',
    'pprint', 'random', 'rjust', 'safe', 'safeseq', 'slice',
    'slugify', 'stringformat', 'striptags', 'time', 'timesince',
    'timeuntil', 'title', 'truncatechars', 'truncatewords', 'upper',
    'urlencode', 'urlize', 'wordcount', 'wordwrap', 'yesno'
];

export function activate(context: vscode.ExtensionContext) {
    initializeTelemetryReporter(context);
    TelemetryLog('info', 'Extension activated');

    // Register completions provider for tags
    const tagProvider = vscode.languages.registerCompletionItemProvider(
        ['django-html', 'html'],
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                const linePrefix = document.lineAt(position).text.substr(0, position.character);

                // Only provide suggestions after {% or in empty lines
                if (!linePrefix.endsWith('{%') && !linePrefix.trim().startsWith('{%')) {
                    return undefined;
                }

                return djangoTags.map(tag => {
                    const item = new vscode.CompletionItem(tag.name, vscode.CompletionItemKind.Snippet);
                    item.insertText = new vscode.SnippetString(tag.snippet);
                    item.documentation = new vscode.MarkdownString(
                        `**${tag.name}**\n\n${tag.description}\n\n[Documentation](${tag.documentation})`
                    );
                    return item;
                });
            }
        },
        '{', '%'
    );

    // Register completions provider for filters
    const filterProvider = vscode.languages.registerCompletionItemProvider(
        ['django-html', 'html'],
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                const linePrefix = document.lineAt(position).text.substr(0, position.character);

                // Only provide filter suggestions after |
                if (!linePrefix.endsWith('|')) {
                    return undefined;
                }

                return djangoFilters.map(filter => {
                    const item = new vscode.CompletionItem(filter, vscode.CompletionItemKind.Function);
                    item.documentation = new vscode.MarkdownString(
                        `Django template filter: \`${filter}\`\n\n` +
                        `[View Documentation](https://docs.djangoproject.com/en/stable/ref/templates/builtins/#${filter})`
                    );
                    return item;
                });
            }
        },
        '|'
    );

    // Register hover provider for tags and filters
    const hoverProvider = vscode.languages.registerHoverProvider(
        ['django-html', 'html'],
        {
            provideHover(document: vscode.TextDocument, position: vscode.Position) {
                const range = document.getWordRangeAtPosition(position);
                if (!range) {
                    return;
                }

                const word = document.getText(range);

                // Check if word is a tag
                const tag = djangoTags.find(t => t.name === word);
                if (tag) {
                    return new vscode.Hover(
                        new vscode.MarkdownString(
                            `**Django Template Tag: ${tag.name}**\n\n${tag.description}\n\n` +
                            `[View Documentation](${tag.documentation})`
                        )
                    );
                }

                // Check if word is a filter
                if (djangoFilters.includes(word)) {
                    return new vscode.Hover(
                        new vscode.MarkdownString(
                            `**Django Template Filter: ${word}**\n\n` +
                            `[View Documentation](https://docs.djangoproject.com/en/stable/ref/templates/builtins/#${word})`
                        )
                    );
                }
            }
        }
    );

    // Register bracket matching for Django template tags
    const bracketMatchingProvider = vscode.languages.registerDocumentRangeFormattingEditProvider(
        ['django-html', 'html'],
        {
            provideDocumentRangeFormattingEdits(document: vscode.TextDocument, range: vscode.Range) {
                const text = document.getText(range);
                // Add basic formatting for Django template tags
                const formattedText = text
                    .replace(/{%\s+/g, '{% ')
                    .replace(/\s+%}/g, ' %}')
                    .replace(/{{\s+/g, '{{ ')
                    .replace(/\s+}}/g, ' }}');

                return [new vscode.TextEdit(range, formattedText)];
            }
        }
    );

    // Register status bar item to show current template context
    const statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        100
    );
    statusBarItem.text = "$(symbol-structure) Django Template";
    statusBarItem.tooltip = "Click to view template hierarchy";
    statusBarItem.show();

    statusBarItem.command = 'django-template-intelligence.showTemplateHierarchy';

    // Register command to show template hierarchy
    const templateHierarchyCommand = vscode.commands.registerCommand(
        'django-template-intelligence.showTemplateHierarchy',
        async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                return;
            }

            const document = editor.document;
            const text = document.getText();

            // Parse extends tags to show template hierarchy
            const extendsMatch = text.match(/{%\s+extends\s+["']([^"']+)["']\s+%}/);
            if (extendsMatch) {
                vscode.window.showInformationMessage(
                    `This template extends: ${extendsMatch[1]}`
                );
            }
        }
    );

    context.subscriptions.push(
        tagProvider,
        filterProvider,
        hoverProvider,
        bracketMatchingProvider,
        statusBarItem,
        templateHierarchyCommand
    );
}

export function deactivate() {
    TelemetryLog('info', 'Extension deactivated');
}