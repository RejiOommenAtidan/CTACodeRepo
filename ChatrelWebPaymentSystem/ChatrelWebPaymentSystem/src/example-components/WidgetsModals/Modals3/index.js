import React, { useState } from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@material-ui/core';

export default function LivePreviewExample() {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);

  const toggle1 = () => setModal1(!modal1);
  const toggle2 = () => setModal2(!modal2);
  const toggle3 = () => setModal3(!modal3);
  const toggle4 = () => setModal4(!modal4);

  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Button
          onClick={toggle1}
          className="btn-primary shadow-none btn-gradient bg-strong-bliss m-2">
          Strong bliss
        </Button>
        <Dialog
          open={modal1}
          onClose={toggle1}
          classes={{ paper: 'shadow-sm-dark modal-dark bg-strong-bliss' }}>
          <DialogTitle className="bg-white-10">Example modal</DialogTitle>
          <DialogContent>
            <p>
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in Bookmarksgrove right at the coast of the Semantics, a
              large language ocean.
            </p>
            <p>
              A small river named Duden flows by their place and supplies it
              with the necessary regelialia. It is a paradisematic country, in
              which roasted parts of sentences fly into your mouth.
            </p>
          </DialogContent>
          <DialogActions className="p-4 bg-white-10">
            <Button className="bg-white-10 text-white" onClick={toggle1}>
              Close
            </Button>{' '}
            <Button className="btn-primary ml-auto" onClick={toggle1}>
              Save changes
            </Button>
          </DialogActions>
        </Dialog>

        <Button
          onClick={toggle2}
          className="btn-primary shadow-none btn-gradient bg-amy-crisp m-2">
          Amy crisp
        </Button>

        <Dialog
          open={modal2}
          onClose={toggle2}
          classes={{ paper: 'modal-content modal-dark bg-amy-crisp' }}>
          <DialogTitle>Example modal</DialogTitle>
          <DialogContent>
            <p>
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in Bookmarksgrove right at the coast of the Semantics, a
              large language ocean.
            </p>
            <p>
              A small river named Duden flows by their place and supplies it
              with the necessary regelialia. It is a paradisematic country, in
              which roasted parts of sentences fly into your mouth.
            </p>
          </DialogContent>
          <DialogActions className="p-4">
            <Button variant="contained" color="primary" onClick={toggle2}>
              Yes, I confirm
            </Button>
          </DialogActions>
        </Dialog>

        <Button
          onClick={toggle3}
          className="btn-primary shadow-none btn-gradient bg-warning m-2">
          Warning
        </Button>
        <Dialog
          open={modal3}
          onClose={toggle3}
          classes={{ paper: 'shadow-lg modal-dark bg-warning' }}>
          <DialogTitle>Example modal</DialogTitle>
          <DialogContent>
            <p>
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in Bookmarksgrove right at the coast of the Semantics, a
              large language ocean.
            </p>
            <p>
              A small river named Duden flows by their place and supplies it
              with the necessary regelialia. It is a paradisematic country, in
              which roasted parts of sentences fly into your mouth.
            </p>
          </DialogContent>
          <DialogActions className="bg-white-10 p-4">
            <Button className="btn-secondary ml-auto" onClick={toggle3}>
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <Button
          onClick={toggle4}
          className="btn-primary shadow-none btn-gradient bg-plum-plate m-2">
          Plum plate
        </Button>
        <Dialog
          open={modal4}
          onClose={toggle4}
          classes={{ paper: 'modal-content modal-dark bg-plum-plate' }}>
          <DialogTitle>Example modal</DialogTitle>
          <DialogContent>
            <p>
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in Bookmarksgrove right at the coast of the Semantics, a
              large language ocean.
            </p>
            <p>
              A small river named Duden flows by their place and supplies it
              with the necessary regelialia. It is a paradisematic country, in
              which roasted parts of sentences fly into your mouth.
            </p>
          </DialogContent>
          <DialogActions className="p-4">
            <Button className="btn-second" onClick={toggle4}>
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
