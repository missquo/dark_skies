import React, { Component } from 'react';
import { render } from 'react-dom';
import './App.css';


// Critical help from https://cuneyt.aliustaoglu.biz/en/using-google-maps-in-react-without-custom-libraries/
class InitMap extends Component {
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this)
  }

  onScriptLoad() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
    this.props.onMapLoad(map)
  }

  componentDidMount() {
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=AIzaSyCtbHqdrnj-iibIguzGZngB4__2qR1MpwM`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
 
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }

  render() {
    return (
      <div style={{ width: 500, height: 900 }} id={this.props.id} />
    );
  }
}

export default InitMap