import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import InputArea from '@/components/form/InputArea';

import useSetsFieldArrayForm from '@/hooks/useSetsFieldArrayForm';
import { useForm } from 'react-hook-form';
import InstructionDialog from './InstructionDialog';

interface Option {
  text: string;
}

interface QustionFormProps {
  title: string;
  description: { html: string }[];
  options: Option[];
  correctAnswer: string;
}

export default function QustionForm({
  handleQustions,
  description,
  setDescription
}: {
  handleQustions: any;
  setDescription: any;
  description: any;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<QustionFormProps>();

  const { fields, addField, removeField } = useSetsFieldArrayForm({
    watchName: 'instruction',
    fieldArrayName: 'instruction',
    watch,
    control,
  });


  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const closeInstructionDialog = () => {
    setIsOpen(false);
  };

  const addInstruction = (data: any) => {
    setDescription((prev: any) => [
      ...prev,
      {
        html: data,
      },
    ]);
  };

  return (
    <div className="flex-1 ">
      <InstructionDialog
        isOpen={isOpen}
        closeInstructionDialog={closeInstructionDialog}
        addInstruction={addInstruction}
      />
      <form
        onSubmit={handleSubmit((data) => {
          handleQustions(data, description);
          reset();
        })}
        className={cn('grid items-start gap-4 rounded-md border p-3')}
      >
        <div className="grid gap-2">
          <InputArea
            label="Title"
            name="title"
            type="text"
            defaultValue=""
            placeholder="Literature"
            register={register}
            error={errors?.title}
          />
        </div>
        <div className="grid gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              handleIsOpen();
            }}
          >
            Add Instruction
          </Button>
          {description.map((instruction: any, idx: number) => (
            <div key={`idx-${idx + 1}`} className="flex gap-4 py-2">
              <div className=" h-full w-full rounded-md border bg-gray-100 p-3">
                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: instruction.html,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {fields.map((field, idx) => (
          <div
            className="flex w-full items-center gap-1"
            key={`idx-${idx + 1}`}
          >
            <div className="grid flex-1 gap-2">
              <InputArea
                className="w-full"
                label={`Option ${idx + 1}`}
                name={`options[${idx}].text`}
                type="text"
                defaultValue=""
                placeholder="Mark Twain"
                register={register}
                error={errors?.options?.[idx]?.text}
              />
            </div>
            <Button
              className="h-8 w-8"
              variant="ghost"
              type="button"
              onClick={() => removeField(idx)}
            >
              x
            </Button>
          </div>
        ))}
        <div className="grid gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              addField();
            }}
          >
            Add Option
          </Button>
        </div>
        <div className="grid gap-2">
          <InputArea
            label="Correct Answer"
            name="correctAnswer"
            type="text"
            defaultValue=""
            placeholder="William Shakespeare"
            register={register}
            error={errors?.correctAnswer}
          />
        </div>

        <Button variant="outline" type="submit">
          Add Qustions
        </Button>
      </form>
    </div>
  );
}
