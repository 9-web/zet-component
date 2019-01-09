### input

<style>
  .author {
    color: red;
  }
</style>

```jsx
/*react*/
<script>
 export default class Application extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        color: 'blue'
      }
      this.globalVariable = globalVariable
    }
    render() {
      return (
        <div>
          <div className='wrapper' ref={el => this.el = el}>
            <div>
            <p class='author'>author: {this.globalVariable}</p>
            <button style={{color: this.state.color}} className='test' onClick={e => {alert('author: ' + this.globalVariable); this.setState({color: 'red'})}}>test</button>
            </div>
          </div>
        </div>
      )
    }
  }
</script>
```