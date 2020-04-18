resource "aws_sqs_queue" "user_queue" {
  name                        = "user_queue.fifo"
  fifo_queue                  = true
  content_based_deduplication = true
}
