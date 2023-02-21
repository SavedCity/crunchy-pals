import React, { useContext } from "react";
import UserContext from "contexts/user";

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
          return (
            <div key={i}>
              {review.productName} {review.rating}
            </div>
          );
        })}
      </div>
    </>
  );
}
