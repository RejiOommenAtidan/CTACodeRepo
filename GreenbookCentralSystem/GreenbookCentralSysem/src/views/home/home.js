import React from 'react';
import { Card } from '@material-ui/core';
import projectLogo from '../../assets/images/ctalogo.png';
export default function LivePreviewExample() {
  return (
    <>
      <Card className="card-box mb-spacing-6-x2" style={{ textAlign: 'center', padding: 50 }} >
        <img
          alt="CTA"
          src={projectLogo}
        />
        <h1>CTA</h1>
        <h2>བཙན་འབྱོལ་བོད་མིའི་རང་དབང་</h2>
        <h2>གཅེས་འཛིན་དྭང་བླང་</h2>
        <h2>དཔྱ་དངུལ་ལག་དེབ</h2>
        <h2>གྲངས་མཛོད།</h2>
      </Card>
    </>
  );
}
