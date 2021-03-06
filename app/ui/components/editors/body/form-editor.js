import React, {PropTypes, PureComponent} from 'react';
import autobind from 'autobind-decorator';
import KeyValueEditor from '../../key-value-editor/editor';
import {trackEvent} from '../../../../analytics/index';

@autobind
class FormEditor extends PureComponent {
  _handleTrackToggle (pair) {
    trackEvent(
      'Form Editor',
      `Toggle ${pair.type || 'text'}`,
      pair.disabled ? 'Disable' : 'Enable'
    );
  }

  _handleTrackChangeType (type) {
    trackEvent('Form Editor', 'Change Type', type);
  }

  _handleTrackChooseFile () {
    trackEvent('Form Editor', 'Choose File');
  }

  _handleTrackCreate () {
    trackEvent('Form Editor', 'Create');
  }

  _handleTrackDelete () {
    trackEvent('Form Editor', 'Delete');
  }

  render () {
    const {
      parameters,
      onChange,
      handleRender,
      handleGetRenderContext
    } = this.props;

    return (
      <div className="scrollable-container tall wide">
        <div className="scrollable">
          <KeyValueEditor
            sortable
            namePlaceholder="name"
            valuePlaceholder="value"
            handleRender={handleRender}
            handleGetRenderContext={handleGetRenderContext}
            onToggleDisable={this._handleTrackToggle}
            onChangeType={this._handleTrackChangeType}
            onChooseFile={this._handleTrackChooseFile}
            onCreate={this._handleTrackCreate}
            onDelete={this._handleTrackDelete}
            onChange={onChange}
            pairs={parameters}
            multipart
          />
        </div>
      </div>
    );
  }
}

FormEditor.propTypes = {
  // Required
  onChange: PropTypes.func.isRequired,
  parameters: PropTypes.arrayOf(PropTypes.object).isRequired,

  // Optional
  handleRender: PropTypes.func,
  handleGetRenderContext: PropTypes.func
};

export default FormEditor;
