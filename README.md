# Webpack-React-Playground

[Launch](https://lit-sea-41628.herokuapp.com/)

There isn't really much to this project. It's just as the repository
name suggests: a playground for working with webpack and react. I'm
just testing these technologies out, and wanted a place to put that 
work.

So far, things I've gotten working are:
* Basic React rendering
* Basic React-Router integration
* Component Hot Loading
* Server Side Rendering
* Babel Integration
* CSS integration
* Better Production support
* Deploy on Heroku
* SCSS integration
* Add a data store via redux

## System Configuration

On Ubuntu, I had to execute `echo fs.inotify.max_user_watches=524288 |
sudo tee -a /etc/sysctl.conf && sudo sysctl -p` to enable hot module 
reloading on the reducers. There was not enough watchers available to 
let webpack detect changes in those files. (Courtesy of: [React Hot Loader Troubleshooting doc](https://github.com/gaearon/react-hot-loader/blob/master/docs/Troubleshooting.md))