import { BookCardSixcolum } from "../../../Components/BookCard/BookCard";

export function ModalContent({ bookShelfCase }) {
  return (
    <>
      {bookShelfCase.bookShelfCase &&
        bookShelfCase.bookShelfCase.map((item) => (
          <BookCardSixcolum
            id={item.id}
            key={item.id}
            bookCoverImg={item.bookCoverImg}
            bookName={item.bookName}
            writer={item.writer}
          />
        ))}
    </>
  );
}
