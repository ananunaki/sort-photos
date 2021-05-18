# Usage

Sort photos in folders by years, month using name of file and EXIF create date, if any errors files will stay unchanged.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install sort-photos.

```bash
npm install sort-photos
```

## Usage
You will provide the relative path to the source directory and results directory, or the app will create 2 directories accordingly "forsort" and "sorted".


```node
const { SortPhoto } = require("sort-photos");

SortPhoto('./source', './result');

/* 
Will use photos from "forsort" dir, and the result will write to "sorted"
*/
SortPhoto()
```



## License
[MIT](https://choosealicense.com/licenses/mit/)