/** @jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import { useEvaluation } from "./Evaluation";
import ImageModal from "../../components/ImageModal";

const styles = {
  container: css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  `,
  imageContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
    width: 40%;

    background-color: white;
    border-radius: 20px;

    img {
      height: 20vw;
      object-fit: cover;
    }

    &:hover {
      cursor: pointer;
    }
  `,
};

export const Content = () => {
  const evaluationContext = useEvaluation();

  return (
    <div css={styles.container}>
      <div css={styles.imageContainer}>
        <ImageModal
          src={`measures_parameters/${evaluationContext.section.jpg}`}>
          <img
            src={`measures_parameters/${evaluationContext.section.jpg}`}
            alt='measure'
          />
        </ImageModal>
      </div>
      <div css={styles.imageContainer}>
        <ImageModal src={`train_history/${evaluationContext.section.jpg}`}>
          <img
            src={`train_history/${evaluationContext.section.jpg}`}
            alt='measure'
          />
        </ImageModal>
      </div>
    </div>
  );
};
