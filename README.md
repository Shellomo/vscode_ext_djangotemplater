# DjangoTemplater - VS Code Extension

Enhanced Django template support for Visual Studio Code, making template development faster and more intuitive.

## ✨ Features

### Syntax Intelligence
- Advanced syntax highlighting for Django template tags and filters
- Smart indentation and formatting
- Intelligent tag matching
- Code folding for template blocks

### Template Tag Support
- Auto-completion for built-in Django template tags
- Hover documentation for template tags and filters
- Quick info on custom template tags
- Go to definition support for included templates

### Productivity Tools
- Auto-closing pairs for template tags `{% %}` and variables `{{ }}`
- Comment toggling with `{# #}`
- Multi-cursor support for template editing
- Snippets for common Django patterns

## 📦 Installation

```bash
# Via VS Code Marketplace
1. Open VS Code
2. Press Ctrl+P
3. Run: ext install djangotemplater

# Manual Installation
1. Download .vsix from Releases
2. VS Code → Extensions → ... → "Install from VSIX"
```

## 🔧 Configuration

```json
{
  "djangotemplater.customTags": ["my_custom_tag"],
  "djangotemplater.formatOnSave": true,
  "djangotemplater.validateOnType": true
}
```

## 🚀 Quick Start

1. Open a Django template file (.html, .django-html)
2. Start typing `{%` to see tag suggestions
3. Use `Ctrl+/` to toggle comments
4. Press `Tab` after template tags for auto-completion

## 🛠 Development

```bash
git clone https://github.com/yourusername/djangotemplater
cd djangotemplater
npm install
npm run watch # For development
npm run package # For distribution
```

## 📝 License

MIT

## 🔄 Changelog

### 1.0.0
- Intelligent syntax highlighting
- Auto-completion for Django tags
- Smart indentation support
- Template tag documentation