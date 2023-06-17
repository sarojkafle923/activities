import { Message } from "semantic-ui-react";

interface Props {
  errors: any;
}

export const ValidationError: React.FC<Props> = ({ errors }) => {
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((err: string, i: any) => (
            <Message.Item key={i}>{err}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  );
};
