import memoizedBrowserHistory from 'helpers/memoizedBrowserHistory'

// uses browser router or server router depending on presence of response object in arguments
export const redirect = (path, res = null) => {
  if (res) {
    res.redirect(path)
    // we need to mark the response as finished to avoid double-render/double headers being set later in the stack
    // ( see src/server.js )
    res.finished = true
  } else {
    new memoizedBrowserHistory().push(path)
  }
}
