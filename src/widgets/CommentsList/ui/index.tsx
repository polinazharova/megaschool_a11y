import { CommentCard } from '../../../entities/comment/ui';
import { Comment } from '../../../entities/comment/model/types';
import { Empty } from 'antd';
import { RefObject } from 'react';

interface Props {
  comments: Comment[];
  emptyText?: string;
  showPlaceInfo?: boolean;
  placeName?: string;
  commentsRef: RefObject<HTMLDivElement>;
}

export const CommentsList = ({
  comments,
  emptyText = 'Пока нет комментариев',
  showPlaceInfo = false,
  placeName,
  commentsRef,
}: Props) => {
  if (comments.length === 0) {
    return (
      <Empty
        description={emptyText}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        style={{ margin: '40px 0' }}
      />
    );
  }

  return (
    <div
      aria-label="Комментарии"
      ref={commentsRef}
      id="comments"
      style={{ maxWidth: '800px', margin: '0 auto' }}
    >
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          showPlaceInfo={showPlaceInfo}
          placeName={placeName}
        />
      ))}
    </div>
  );
};
