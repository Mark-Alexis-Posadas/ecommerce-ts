import { useCart } from '../../hooks/useCart';
import type { CartItem } from '../../types/cart';
export function CartFeedback() {
  const { loading, pending, error, success, refreshCart } = useCart();
  return (
    <div aria-live="polite" className="mb-4 space-y-2 text-sm">
      {loading && <p>Loading current prices and stock...</p>}
      {pending && <p>Updating cart...</p>}
      {error && (
        <p role="alert" className="text-red-300">
          {error}{' '}
          <button
            disabled={pending || loading}
            onClick={() => void refreshCart()}
            className="underline"
          >
            Refresh cart
          </button>
        </p>
      )}
      {success && !error && (
        <p role="status" className="text-green-300">
          {success}
        </p>
      )}
    </div>
  );
}
export function CartLineIssues({ item }: { item: CartItem }) {
  return (
    <div className="mt-2 space-y-1 text-xs">
      {(item.discount || 0) > 0 && (
        <p className="text-indigo-300">{item.discount}% discount applied</p>
      )}
      {item.available && <p className="text-gray-400">{item.availableStock} currently available</p>}
      {item.issues.map((issue) => (
        <p key={issue.code} className="text-amber-300">
          {issue.message}
        </p>
      ))}
    </div>
  );
}
