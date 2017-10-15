import React from 'react'
import renderer from 'react-test-renderer';

// Hack to use `src` when running coverage
const Eitherx = process.env.npm_package_scripts_test_coverage
  ? require('../src').default
  : require('../dist/eitherx.cjs.js')

test('should throw if < 1 or > 2 children are passed', () => {
  expect(() => renderer.create(<Eitherx></Eitherx>))
    .toThrowErrorMatchingSnapshot()
  expect(() => renderer.create(<Eitherx><div/><div/><div/></Eitherx>))
    .toThrowErrorMatchingSnapshot()
})

test('should throw render is passed but not catchError', () => {
  expect(() => renderer.create(
    <Eitherx
      render={() => (<div/>)}
    />
  )).toThrowErrorMatchingSnapshot()
})

test('should throw if render or catchError is not a function', () => {
  expect(() => renderer.create(
    <Eitherx
      render={() => (<div/>)}
      catchError={"Not a function"}
    />
  )).toThrowErrorMatchingSnapshot()

  expect(() => renderer.create(
    <Eitherx
      render={"Not a function"}
      catchError={() => (<div/>)}
    />
  )).toThrowErrorMatchingSnapshot()
})

class ErrorComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    throw new Error('Test Error')
  }
}

test('should return null if no error handler is passed, and error is thrown', () => {
  let component = renderer.create(
    <Eitherx>
      <p>My Paragraph</p>
    </Eitherx>
  )
  expect(component.toJSON()).toMatchSnapshot();

  component = renderer.create(
    <Eitherx>
      <ErrorComponent>"My Error"</ErrorComponent>
    </Eitherx>
  )
  expect(component.toJSON()).toEqual(null);
})

test('should render second component on error', () => {
  let component = renderer.create(
    <Eitherx>
      <p>"Happy Child 😄"</p>
      <p>"Error as child ☹️"</p>
    </Eitherx>
  )
  expect(component.toJSON()).toMatchSnapshot();

  component = renderer.create(
    <Eitherx>
      <ErrorComponent>"Function as child 😄"</ErrorComponent>
      <p>"Error as child ☹️"</p>
    </Eitherx>
  )
  expect(component.toJSON()).toMatchSnapshot();
})

test('should work with render-catch props as well', () => {
  let component = renderer.create(
    <Eitherx
      render={() => (<p>"Render Prop"</p>)}
      catchError={() => (<p>"Catch Prop"</p>)}
    />
  )
  expect(component.toJSON()).toMatchSnapshot();

  component = renderer.create(
    <Eitherx
      render={() => (<ErrorComponent>"Render Prop"</ErrorComponent>)}
      catchError={() => (<p>"Catch Prop"</p>)}
    />
  )
  expect(component.toJSON()).toMatchSnapshot();
})
