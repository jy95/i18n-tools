---
slug: flat-json-now-supported
title: Flat JSON now supported
authors: [jy95]
tags: [feature]
---

Flat JSON such as this one are now supported :
```json
{
  "unchanged.key_with-special-char!":"Hello",
  "changed.key_test$":"world !"
}
```

Don't forget to set option `keySeparator` to `false` in your `settings.json` or `settings.js` files.