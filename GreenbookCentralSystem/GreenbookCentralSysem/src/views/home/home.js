import React from 'react';
import { Card } from '@material-ui/core';
import projectLogo from '../../assets/images/ctalogo.png';
export default function Home() {
  return (
    <>
      <Card className="card-box mb-spacing-6-x2" style={{ textAlign: 'center', padding: 50 }} >
        <img
          alt="CTA"
          src={projectLogo}
          width={"25%"}
          //height={}
        />
        {/*<h1>CTA</h1>*/}
        <h1>བཙན་བྱོལ་བོད་མིའི་རང་དབང་</h1>
        <h1>གཅེས་འཛིན་དང་བླངས་</h1>
        <h1>དཔྱ་དངུལ་ལག་དེབ་</h1>
        <h1>གྲངས་མཛོད།</h1>
      </Card>
    </>
  );
}
