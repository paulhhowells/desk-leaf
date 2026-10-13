import { 
    useForm,
    useSelector,
    // FieldInfo,
} from '@tanstack/react-form'
import type { CellData } from "./types";

const defaultValues = {
    comment: '',
};

interface Props {
    cell?: CellData;
}

export function DeskLeaf ({ cell }: Props) {
    const form = useForm({
        defaultValues: defaultValues,
        onSubmit: async ({ value }) => {
            // Do something with form data
            console.log(value);

            console.log(cell);
        },
    });
    const commentField = useSelector(form.store, (state) => state.values.comment);

    const handleSubmit = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();

        form.handleSubmit();
    };

    return (
        <div className="desk__leaf">
            <form>
                <form.Field
                    name="comment"
                    children={(field) => (
                        <>
                            <input
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                        </>
                    )}
                />
                <button type="submit" onClick={ handleSubmit }>Submit { commentField }</button>
            </form>
            <pre>{ JSON.stringify(cell) }</pre>
        </div>
    );
}
