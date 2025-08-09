import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  decrement,
  decrementAmount,
  increment,
  incrementAmount,
} from "../redux/features/counter/counterSlice";

export default function About() {
  const counter = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="py-16 px-4 container mx-auto">
        <h1> This is About component </h1>

        <div>
          <Button onClick={() => dispatch(increment())}>Increment</Button>
          <Button onClick={() => dispatch(incrementAmount(5))}>
            Increment 5
          </Button>
          <p>{counter.count}</p>

          <Button onClick={() => dispatch(decrement())}>Decrement</Button>
          <Button onClick={() => dispatch(decrementAmount(5))}>
            Decrement 5
          </Button>
        </div>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, qui
          eos. Architecto quisquam odit soluta fugit quos ab unde, voluptatem
          eos necessitatibus nesciunt, in neque consequatur adipisci velit
          accusantium illum.
        </p>
      </div>
    </>
  );
}
