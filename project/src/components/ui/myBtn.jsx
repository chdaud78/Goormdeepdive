import { twMerge } from 'tailwind-merge'

export default function Button({ isPrimary }) {
  return (
    <button
      className={twMerge(
        'px-4 px-2 rounded font-bold',
        isPrimary ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black',
        'bg-red-500'
      )}
    >
      Click me
    </button>
  )
}
