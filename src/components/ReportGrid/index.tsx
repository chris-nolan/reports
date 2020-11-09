import React from 'react';
// @ts-ignore
import { Responsive } from 'react-grid-layout';
import { withSize } from 'react-sizeme'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// @ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
// @ts-ignore
import InlineEditor from '@ckeditor/ckeditor5-build-inline';

import { ReportGridEditableCell } from '../ReportGridEditableCell';

const styles = {
  reportWidget: {
    height: 'inherit'
  }
};

const withSizeHOC = withSize()

export class ReportGridCore extends React.Component<{ classes: any, size: any, editing: boolean }> {

  private layout = [
    {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
    {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
    {i: 'c', x: 4, y: 0, w: 1, h: 2}
  ];

  private layouts = { lg: this.layout };

  private editor = null;

  render = () => {
    return (
      <Responsive
        className="layout"
        width={this.props.size.width}
        layouts={this.layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        isDraggable={!this.props.editing}
      >
        <div key="a">
          <ReportGridEditableCell key="a" editing={this.props.editing}/>
        </div>
        <div key="b">
          <ReportGridEditableCell key="b" editing={this.props.editing}/>
        </div>
        <div key="c">
          <ReportGridEditableCell key="c" editing={this.props.editing}/>
        </div>
      </Responsive>
    )
  }
}

export const ReportGrid = withStyles(styles)(withSizeHOC(ReportGridCore));