import React, { useContext } from "react";
import UserContext from "contexts/user";
import H3 from "components/_atoms/H3";
import P from "components/_atoms/P";

import styles from "./index.module.scss";

export default function HomePage({ reviews }: any) {
  const { userData }: object | any = useContext(UserContext);
  const { username } = userData || {};

  console.log(reviews);

  return (
    <>
      <div className={styles.homeContainer}>
        Great Home Page Content by {username}
      </div>

      <div>
        {reviews.map((review: any, i: number) => {
          const { productName, rating, image } = review;
          return (
            <div key={i}>
              <H3>{productName}</H3>
              <P>{rating}</P>
            </div>
          );
        })}
      </div>
    </>
  );
}
