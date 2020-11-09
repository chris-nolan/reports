import React from 'react';
// @ts-ignore
import { Responsive } from 'react-grid-layout';
import clsx from 'clsx';
import { withSize } from 'react-sizeme'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// @ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
// @ts-ignore
import InlineEditor from '@ckeditor/ckeditor5-build-inline';

import './styles.css';

const styles = {
  reportWidget: {
    height: 'inherit',
  },
  widgetView: {
    paddingLeft: '0.6em',
    paddingRight: '0.6em'
  }
};

const withSizeHOC = withSize()

export class ReportGridEditableCellCore extends React.Component<{ classes: any, size: any, key: string, editing: boolean }, { data: string }> {

  private editor = null;

  constructor(props: any) {
    super(props);

    this.state = {
      data: "<p>Hello!<p>"
    }
  }

  /*
  componentDidUpdate = () => {
    if (this.editor !== null) {
      // @ts-ignore
      this.editor.ui.view.editable.editableElement.style.height = this.props.size.height;
    }
  }*/

  render = () => {
    if (this.props.editing) {
      return (
        <Card className={this.props.classes.reportWidget}>
          <CKEditor
            editor={ InlineEditor }
            data={this.state.data}
            onReady={ (editor: any) => {
                // You can store the "editor" and use when it is needed.
                console.log( 'Editor is ready to use!', editor );
                this.editor = editor;
            } }
            onChange={ ( event: any, editor: any ) => {
                const data = editor.getData();
                console.log( { event, editor, data } );
                this.setState({data: data});
            } }
          />
        </Card>
      )
    } else {
      return (
        <Card className={clsx(this.props.classes.reportWidget, this.props.classes.widgetView)}>
          <div className="ck-content" dangerouslySetInnerHTML={{__html: this.state.data}} />
        </Card>
      )
    }
  }
}

export const ReportGridEditableCell = withStyles(styles)(withSizeHOC(ReportGridEditableCellCore));