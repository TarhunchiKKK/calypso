## Overiew

Here are configurations of VS Code extensions that can be applied for more effective interaction with the code.

_This configurations should be applied to global `settings.json` file._

### [Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)

```json
{
    "todo-tree.general.tags": ["BUG", "HACK", "FIXME", "RECHECK", "INCOMPLETE", "TODO", "USEFUL"],
    "todo-tree.highlights.defaultHighlight": {
        "icon": "alert",
        "type": "text-and-comment",
        "background": "transparent",
        "iconColour": "blue",
        "gutterIcon": true
    },
    "todo-tree.highlights.customHighlight": {
        "TODO": {
            "icon": "checkbox",
            "iconColour": "yellow"
        },
        "USEFUL": {
            "icon": "verified",
            "iconColour": "mediumaquamarine"
        },
        "FIXME": {
            "icon": "tools",
            "iconColour": "burlywood"
        },
        "RECHECK": {
            "icon": "codescan",
            "iconColour": "chocolate"
        },
        "INCOMPLETE": {
            "icon": "alert",
            "iconColour": "mediumvioletred"
        },
        "BUG": {
            "icon": "bug",
            "iconColour": "crimson"
        }
    }
}
```

### [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)

```json
{
    "better-comments.tags": [
        {
            "tag": "*",
            "color": "#98C379",
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false,
            "underline": false,
            "strikethrough": false
        },
        {
            "tag": "!",
            "color": "#FF2D00",
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false,
            "underline": false,
            "strikethrough": false
        },
        {
            "tag": "?",
            "color": "#3498DB",
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false,
            "underline": false,
            "strikethrough": false
        },
        {
            "tag": "//",
            "color": "#474747",
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false,
            "underline": false,
            "strikethrough": true
        },
        {
            "tag": "todo",
            "color": "#FF8C00",
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false,
            "underline": false,
            "strikethrough": false
        },
        {
            "tag": "fixme",
            "color": "#DEB887",
            "backgroundColor": "transparent",
            "bold": true,
            "italic": false,
            "underline": false,
            "strikethrough": false
        },
        {
            "tag": "bug",
            "color": "#DC143C",
            "backgroundColor": "transparent",
            "bold": true,
            "italic": false,
            "underline": false,
            "strikethrough": false
        },
        {
            "tag": "note",
            "color": "#6495ED",
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false,
            "underline": false,
            "strikethrough": false
        },
        {
            "tag": "useful",
            "color": "#66DDAA",
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false,
            "underline": false,
            "strikethrough": false
        },
        {
            "tag": "comment",
            "color": "gray",
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false,
            "underline": false,
            "strikethrough": false
        },
        {
            "tag": "learn",
            "color": "#FF69B4",
            "backgroundColor": "transparent",
            "bold": true,
            "italic": false,
            "underline": false,
            "strikethrough": false
        },
        {
            "tag": "recheck",
            "color": "#7B3F00",
            "backgroundColor": "transparent",
            "bold": true,
            "italic": false,
            "underline": false,
            "strikethrough": false
        },
        {
            "tag": "incomplete",
            "color": "#C71585",
            "backgroundColor": "transparent",
            "bold": true,
            "italic": false,
            "underline": false,
            "strikethrough": false
        }
    ]
}
```
