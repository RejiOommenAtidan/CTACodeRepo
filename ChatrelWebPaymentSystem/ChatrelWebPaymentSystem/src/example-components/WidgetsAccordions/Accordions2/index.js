import React, { useState } from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Collapse,
  FormControlLabel,
  Typography,
  Checkbox,
  Card,
  Button
} from '@material-ui/core';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function LivePreviewExample() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="accordion mb-spacing-6-x2">
        <Card className={clsx('card-box', { 'panel-open': isOpen })}>
          <Card>
            <div className="card-header">
              <div className="panel-title">
                <div className="accordion-toggle">
                  <Button
                    variant="text"
                    size="large"
                    className="btn-link d-flex align-items-center justify-content-between btn-transition-none"
                    onClick={toggle}>
                    <span>Collapse heading 1</span>
                    <FontAwesomeIcon
                      icon={['fas', 'angle-up']}
                      className="font-size-xl accordion-icon"
                    />
                  </Button>
                </div>
              </div>
            </div>
            <Collapse in={isOpen}>
              <div className="p-5">
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. Nihil anim keffiyeh
                helvetica, craft beer labore wes anderson cred nesciunt sapiente
                ea proident.
              </div>
            </Collapse>
          </Card>
        </Card>
      </div>
      <div className="mb-spacing-6-x2">
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header">
            <FormControlLabel
              aria-label="Acknowledge"
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={<Checkbox className="mr-2" />}
              label="I acknowledge that I should stop the click event propagation"
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography color="textSecondary">
              The click event of the nested action will propagate up and expand
              the panel unless you explicitly stop it.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions2-content"
            id="additional-actions2-header">
            <FormControlLabel
              aria-label="Acknowledge"
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={<Checkbox className="mr-2" />}
              label="I acknowledge that I should stop the focus event propagation"
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography color="textSecondary">
              The focus event of the nested action will propagate up and also
              focus the expansion panel unless you explicitly stop it.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions3-content"
            id="additional-actions3-header">
            <FormControlLabel
              aria-label="Acknowledge"
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={<Checkbox className="mr-2" />}
              label="I acknowledge that I should provide an aria-label on each action that I add"
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography color="textSecondary">
              If you forget to put an aria-label on the nested action, the label
              of the action will also be included in the label of the parent
              button that controls the panel expansion.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </>
  );
}
