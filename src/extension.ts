import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('DjangoTemplater is now active!');

    // Register completions provider
    const provider = vscode.languages.registerCompletionItemProvider('django-html', {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
            const djangoTags = [
                'if', 'else', 'elif', 'endif',
                'for', 'endfor',
                'block', 'endblock',
                'extends',
                'include',
                'with', 'endwith'
            ];

            return djangoTags.map(tag => {
                const item = new vscode.CompletionItem(tag, vscode.CompletionItemKind.Keyword);
                item.insertText = new vscode.SnippetString(`{% ${tag} $1 %}`);
                return item;
            });
        }
    }, '{', '%');

    context.subscriptions.push(provider);
}

export function deactivate() {}