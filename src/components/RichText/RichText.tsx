import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface RichTextProps {
  field: string;
}

export const RichText = (props: RichTextProps) => {
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{props.field}</ReactMarkdown>
  );
};
