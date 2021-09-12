import './atoms.module.scss';

/* eslint-disable-next-line */
export interface AtomsProps {
  welcomeMessage?: string;
}

const Atoms = ({
  welcomeMessage = 'Welcome to Atoms!',
}: AtomsProps): JSX.Element => (
  <div>
    <h1>${welcomeMessage}</h1>
  </div>
);

export default Atoms;
