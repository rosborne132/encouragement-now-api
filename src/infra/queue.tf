resource "aws_sqs_queue" "user_queue" {
  name                        = "user_queue.fifo"
  fifo_queue                  = true
  content_based_deduplication = true
}

resource "aws_lambda_event_source_mapping" "user_queue" {
  event_source_arn = "${aws_sqs_queue.user_queue.arn}"
  function_name    = "arn:aws:lambda:us-west-2:280138148799:function:encouragement-now-api-prod-getRandomUser"
}

