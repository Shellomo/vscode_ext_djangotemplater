# Django Template Intelligence - VS Code Extension

🚀 The most comprehensive Django template support for Visual Studio Code, enhancing your template development experience with intelligent features, real-time documentation, and powerful template inheritance visualization.

[![Version](https://img.shields.io/visual-studio-marketplace/v/Shellomo.django-template-intelligence)](https://marketplace.visualstudio.com/items?itemName=Shellomo.django-template-intelligence)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/Shellomo.django-template-intelligence)](https://marketplace.visualstudio.com/items?itemName=Shellomo.django-template-intelligence)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/Shellomo.django-template-intelligence)](https://marketplace.visualstudio.com/items?itemName=Shellomo.django-template-intelligence)

## ✨ Features

### 🎯 Intelligent Template Support
- **Advanced Syntax Highlighting**
  - Precise highlighting for Django template tags, filters, and variables
  - Context-aware color themes for different template elements
  - Support for nested template structures
  - Embedded language support (Python, CSS, JavaScript)

- **Smart Completions**
  - Context-aware autocompletion for template tags and filters
  - Intelligent snippet insertion with placeholders
  - Documentation preview in completion items
  - Custom tag and filter support

### 📚 Documentation & Navigation
- **Hover Information**
  - Instant documentation for template tags and filters
  - Quick access to Django documentation
  - Usage examples and best practices
  - Links to official Django documentation

- **Template Inheritance**
  - Visual template hierarchy visualization
  - Quick navigation between parent and child templates
  - Block structure overview
  - Template relationship insights

### 🛠 Advanced Tools
- **Template Formatting**
  - Automatic tag and filter formatting
  - Consistent spacing and indentation
  - Format on save option
  - Customizable formatting rules

- **Code Intelligence**
  - Smart block matching and highlighting
  - Template syntax validation
  - Error detection and suggestions
  - Performance optimization hints

### ⚡ Productivity Features
- **Quick Actions**
  - Template tag insertion shortcuts (`Ctrl+Shift+T`)
  - Filter quick-insert menu
  - Context menu integration
  - Custom keyboard shortcuts

- **Snippets & Patterns**
  - Common Django template patterns
  - Form handling snippets
  - Security feature integration (CSRF)
  - Responsive design patterns

## 📦 Installation

### Via VS Code Marketplace
1. Open VS Code
2. Press `Ctrl+P` / `Cmd+P`
3. Run: `ext install Shellomo.django-template-intelligence`

### Manual Installation
1. Download the latest `.vsix` from [Releases](https://github.com/Shellomo/vscode_ext_djangotemplater/releases)
2. In VS Code: Extensions → `...` → "Install from VSIX"

## 🔧 Configuration

```jsonc
{
  // General settings
  "djangoTemplates.formatting.enabled": true,
  "djangoTemplates.formatting.formatOnSave": true,
  
  // Validation settings
  "djangoTemplates.validation.enabled": true,
  "djangoTemplates.validation.validateOnType": true,
  
  // Custom elements
  "djangoTemplates.customTags": [
    {
      "name": "my_custom_tag",
      "snippet": "{% my_custom_tag ${1:param} %}",
      "description": "Custom tag description"
    }
  ],
  "djangoTemplates.customFilters": [
    "my_custom_filter"
  ],
  
  // Feature toggles
  "djangoTemplates.hover.enabled": true,
  "djangoTemplates.completion.triggerCharacters": ["{", "%", "|"]
}
```

## 🚀 Quick Start

1. **Template Creation**
   - Open or create a Django template file (`.html`, `.django-html`, `.djhtml`)
   - Start typing `{%` to see available tags
   - Use `|` to access template filters

2. **Key Features**
   - `Ctrl+Space`: Trigger completions
   - `Ctrl+Shift+T`: Quick tag insertion
   - `Alt+/`: Toggle template comments
   - Status bar: Click to view template hierarchy

3. **Template Inheritance**
   - Use `extends` tag to create template hierarchies
   - Navigate blocks using the command palette
   - View inheritance structure via status bar

## 🛠 Development

```bash
# Clone repository
git clone https://github.com/Shellomo/vscode_ext_djangotemplater
cd vscode_ext_djangotemplater

# Install dependencies
npm install

# Development
npm run watch

# Testing
npm run test

# Linting
npm run lint

# Build package
npm run package
```

## 📋 Requirements
- VS Code 1.85.0 or higher
- Django project (for full feature set)

## 🤝 Contributing
Contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📝 License
MIT

## 🔄 Changelog

### 1.1.0
- Added template inheritance visualization
- Enhanced completion with documentation preview
- Improved formatting capabilities
- Added custom tag/filter support
- Added status bar integration
- Enhanced configuration options
- Added keyboard shortcuts
- Improved syntax validation

### 1.0.3
- Fixed minor bug fixes and improvements
- Enhanced documentation
- Performance optimizations

### 1.0.0
- Initial release with basic features
- Syntax highlighting
- Auto-completion
- Smart indentation
- Basic documentation

## 🙏 Acknowledgments
- Django Documentation
- VS Code Extension API
- Contributors and users

## 🐛 Known Issues
Please report issues on our [GitHub repository](https://github.com/Shellomo/vscode_ext_djangotemplater/issues).