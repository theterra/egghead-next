import React, {FunctionComponent} from 'react'
import Link from 'next/link'
import {connectHits} from 'react-instantsearch-dom'
import {convertTimeWithTitles} from 'utils/time-utils'

type CustomHitsProps = {
  hits: any[]
}

const CustomHits: FunctionComponent<CustomHitsProps> = ({hits}) => (
  <div>
    {hits.map((hit) => (
      <HitComponent key={hit.objectID} hit={hit} />
    ))}
  </div>
)

const Hits = connectHits(CustomHits)

type HitComponentProps = {
  hit: any
}

const HitComponent: FunctionComponent<HitComponentProps> = ({hit}) => {
  const {
    path,
    type,
    image,
    title,
    duration,
    instructor_avatar_url,
    instructor_url,
    instructor_name,
  } = hit

  const hasImage = image !== 'https://d2eip9sf3oo6c2.cloudfront.net/logo.svg'

  return (
    <div className="flex items-center py-3 w-full">
      {hasImage && (
        <div className="col-span-1 items-center flex justify-center">
          <Link href={path}>
            <a className="flex-shrink-0">
              <img
                className={`${
                  type === 'lesson'
                    ? 'w-8 h-8 m-4'
                    : 'sm:w-16 sm:h-16 w-12 h-12'
                } `}
                src={`${image}`}
                alt={`illustration for ${title}`}
              />
            </a>
          </Link>
        </div>
      )}
      <div
        className={`${
          hasImage ? 'pl-4' : ''
        } flex sm:flex-row flex-col sm:items-center items-start w-full`}
      >
        <div className="flex flex-col sm:w-3/4 w-full">
          <Link href={path}>
            <a className="self-start">
              <h2 className="sm:text-lg text-base font-semibold leading-tight hover:underline">
                {title}
              </h2>
            </a>
          </Link>
          <div className="sm:text-sm text-sm font-light text-gray-600">
            {type}・{convertTimeWithTitles(duration)}
          </div>
        </div>
        {instructor_url && (
          <Link href={instructor_url}>
            <a className="flex items-center hover:underline sm:mt-0 mt-1 sm:ml-8 ml-0 flex-shrink-0">
              <div
                className="sm:w-8 sm:h-8 w-6 h-6 rounded-full"
                style={{
                  background: `url(${instructor_avatar_url})`,
                  backgroundSize: 'cover',
                }}
              />
              <div className="sm:pl-2 pl-1 text-sm text-gray-700">
                {instructor_name}
              </div>
            </a>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Hits
