import DOMPurify from "dompurify";
import { BlobWrapper, ReferralWrapper } from "./featureBlob.styles";

const FeatureBlob = ({ blobObject }) => {
  const defaultInsightLink =
    "https://wol.jw.org/en/wol/library/r1/lp-e/all-publications/insight";
  const { blob = {} } = blobObject;
  const { paragraphs = [], url = defaultInsightLink } = blob;

  const htmlCleanSnippetIfNoData = (
    <strong>
      Visit{" "}
      <a target="_blank" rel="noreferrer noopener" href="https://wol.jw.org">
        WOL.JW.org
      </a>{" "}
      to search and learn more about this feature
    </strong>
  );

  const sanitizeBlob = (blob) => {
    return DOMPurify.sanitize(blob, {
      USE_PROFILES: { html: true },
      ADD_ATTR: ["target"],
    });
  };

  const sanitizedString = paragraphs.reduce(
    (acc, s) => `${acc}${sanitizeBlob(s)}`,
    ""
  );

  //Used this function to print out what classes are in the stirng for setting up styled component
  //   const printClassSearch = (blobString) => {
  //     var parts = blobString.split(/class=/);
  //     var classes = [];
  //     for (var i = 0; i < parts.length - 1; i++) {
  //       classes[i] = parts[i + 1].split(/\'>/)[0].replace(/\'/).trim();
  //     }
  //     classes.map((c) => console.log(c));
  //   };

  const clean =
    sanitizedString.length > 0 ? sanitizedString : htmlCleanSnippetIfNoData;
  //  console.log(clean);
  //  printClassSearch(clean);

  return (
    <>
      <BlobWrapper dangerouslySetInnerHTML={{ __html: clean }} />
      <ReferralWrapper>
        <a href={url} target="_blank" rel="noreferrer noopener">
          -- Learn more on JW.org --
        </a>
      </ReferralWrapper>
    </>
  );
};

export default FeatureBlob;
