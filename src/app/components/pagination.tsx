'use client'
import { useSearchParams } from "next/navigation";
import { Pagination } from "../typeAliases";
import { useRouter } from 'next/navigation';

const Pagination = (props: Pagination) => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1';
  const per_page = searchParams.get('per_page') ?? '20';
 
  return (
    <div>
        <button
        className={`pagination-button ${!props.hasPreviousPage && 'disabled'}`}
        disabled={!props.hasPreviousPage}
        onClick={() => {
          router.push(`/?page=${Number(page) - 1}&per_page=${per_page}`)
        }}>
        prev page
      </button>
      <button
        className={`pagination-button ${!props.hasNextPage && 'disabled'}`}
        disabled={!props.hasNextPage}
        onClick={() => {
          router.push(`/?page=${Number(page) + 1}&per_page=${per_page}`)
        }}>
        next page
      </button>
    </div>
  )
 }
 export default Pagination;