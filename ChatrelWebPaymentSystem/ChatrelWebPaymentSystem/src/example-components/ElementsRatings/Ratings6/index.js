import React from 'react';

import Rating from '@material-ui/lab/Rating';

import MdHeart from 'react-ionicons/lib/MdHeart';
import MdStar from 'react-ionicons/lib/MdStar';
import IosThumbsUp from 'react-ionicons/lib/IosThumbsUp';
import IosBatteryDead from 'react-ionicons/lib/IosBatteryDead';
import IosBatteryFull from 'react-ionicons/lib/IosBatteryFull';

export default function LivePreviewExample() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Rating
          name="ion-icons-rating-1"
          defaultValue={2}
          icon={<MdHeart color="var(--primary)" fontSize="2rem" beat={true} />}
          emptyIcon={
            <MdHeart color="var(--light)" fontSize="2rem" beat={true} />
          }
        />
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Rating
          name="ion-icons-rating-2"
          defaultValue={2}
          icon={
            <MdStar color="var(--danger)" fontSize="2.2rem" rotate={true} />
          }
          emptyIcon={
            <MdStar color="var(--secondary)" fontSize="2.2rem" rotate={true} />
          }
        />
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Rating
          name="ion-icons-rating-3"
          defaultValue={2}
          icon={<IosThumbsUp color="var(--success)" fontSize="3.2rem" />}
          emptyIcon={<IosThumbsUp color="var(--light)" fontSize="3.2rem" />}
        />
      </div>
      <div className="divider my-3" />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Rating
          name="ion-icons-rating-4"
          defaultValue={2}
          icon={<IosBatteryFull color="var(--first)" fontSize="2.8rem" />}
          emptyIcon={<IosBatteryDead color="var(--light)" fontSize="2.8rem" />}
        />
      </div>
    </>
  );
}
