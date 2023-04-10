import moment from 'moment';

const Job = ({ company, createdAt }) => {
  let date = moment(createdAt);
  // format date
  date = date.format('MMM Do, YYYY');
  return (
    <>
      <div>{company}</div>
      <div>{date}</div>
    </>
  );
};
export default Job;
