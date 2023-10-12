import React from 'react';
import { findDOMNode } from 'react-dom';
import ClipboardJS from 'clipboard';
import { Icon } from 'mt-ui'

class CodeCell extends React.PureComponent {
  state = {
    codeOpen: true,
    copyContent: '复制代码'
  }

  componentDidMount() {
    const clipboard = new ClipboardJS(this.clipButton, {
      target: () => {
        return findDOMNode(this).querySelector('.language-js');
      }
    });
    clipboard.on('success', (e) => {
      e.clearSelection();
      this.setState({ copyContent: '已复制' });
    });
  }

  toggleCode = () => {
    this.setState({
      codeOpen: !this.state.codeOpen
    });
  }

  onVisibleChange = (visible) => {
    if (!visible) {
      setTimeout(() => {
        this.setState({ copyContent: '复制代码' });
      }, 300);
    }
  }

  render() {
    const props = this.props;
    const { codeOpen, } = this.state;
    return (
      <div className={`code ${codeOpen ? '' : 'hide'}`}>
        <div className="select-bar">
          <button onClick={this.toggleCode} className={`doc_code ${codeOpen ? 'active' : ''}`}>
            <Icon name="codeexpanded" size="small" />
          </button>
          <button ref={ref => this.clipButton = ref} className={`doc_code ${codeOpen ? 'active' : ''}`}>
            <Icon name="codecopy" size="small" />
          </button>
        </div>
        <div className="content-code-design">
          <div className={`inner-code ${codeOpen ? '' : 'hide'}`}>
            {props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default CodeCell;
