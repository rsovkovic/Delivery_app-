import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { OrderFormData } from '@/utils/validationShemas';

interface CartFormProps {
  register: UseFormRegister<OrderFormData>;
  errors: FieldErrors<OrderFormData>;
}

export const CartForm = ({ register, errors }: CartFormProps) => {
  return (
    <div className="flex-1 bg-zinc-900 p-8 rounded-3xl border border-zinc-800 space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Delivery Info</h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-zinc-400 ml-1">Full Name</label>
          <input
            {...register('name')}
            className={`w-full bg-zinc-800 border ${errors.name ? 'border-red-500' : 'border-zinc-700'} p-4 rounded-2xl focus:outline-none focus:border-orange-600 text-white`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-zinc-400 ml-1">Email Address</label>
          <input
            {...register('email')}
            className={`w-full bg-zinc-800 border ${errors.email ? 'border-red-500' : 'border-zinc-700'} p-4 rounded-2xl focus:outline-none focus:border-orange-600 transition-all`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm text-zinc-400 ml-1">Phone Number</label>
          <input
            {...register('phone')}
            placeholder="+380..."
            className={`w-full bg-zinc-800 border ${errors.phone ? 'border-red-500' : 'border-zinc-700'} p-4 rounded-2xl focus:outline-none focus:border-orange-600 transition-all`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm text-zinc-400 ml-1">Delivery Address</label>
          <input
            {...register('address')}
            className={`w-full bg-zinc-800 border ${errors.address ? 'border-red-500' : 'border-zinc-700'} p-4 rounded-2xl focus:outline-none focus:border-orange-600 transition-all`}
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {errors.address.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
