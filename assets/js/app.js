import "phoenix_html"
import React from 'react';
import store from './store';

import {imdbae_init} from "./imdbae/imdbae";

function init() {
  imdbae_init(store);
}

$(init);

require("bootstrap");
