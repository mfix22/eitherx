# `<EitheRx />`
Super simple, reusable binary Error boundaries for React. Your go-to, prescribed, error-boundary helper

## Usage
```shell
$ npm i --save eitherx
```

```javascript
import Either from 'eitherx'

// Wrapper-component Style
<Either>
  <p>"Happy Child 😄"</p>
  <p>"Error child ☹️ (but at least your UI is happy)"</p>
</Either>

// OR use the `render` and `handleErrors` props

// Render-prop Style
<Either
  render={() => (<p>"Happy Child 😄"</p>)}
  handleErrors={({ error, info }) => (
    <div>
      <p>{`Info: ${info}`}</p>
      <p>{`Error: ${error}`}</p>
    </div>
  )}
/>
```

### Wrapper Component Style
`Eitherx` either renders the first child component, unless an error occurred while rendering, then the second child is rendered. Easy enough 😄.

If you do not pass a second child, and an error occurs, `null` will be return to React to render.

### Render-prop Style
Using this style, you must pass a function for both `render` _and_ `handleErrors`. If an error occurs, the component
returned from `handleErrors` will be rendered. Otherwise `Eitherx` will render the component returned from `render`.

The `handleErrors` function receives an object with the fields `error` and `info`, both of which are passed directly from
[React Error Boundaries](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html#introducing-error-boundaries).
