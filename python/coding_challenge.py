### Challenge 1

# For this exercise you will be strengthening your page-fu mastery. You will complete the PaginationHelper class, which is a utility class helpful for querying paging information related to an array.

# The class is designed to take in an array of values and an integer indicating how many items will be allowed per each page. The types of values contained within the collection/array are not relevant.

# TODO: complete this class

class PaginationHelper:

  # The constructor takes in an array of items and a integer indicating
  # how many items fit within a single page
  def __init__(self, collection, items_per_page):
    self.collection = collection
    self.items_per_page = items_per_page

  # returns the number of items within the entire collection
  def item_count(self):
    return len(self.collection)

  # returns the number of pages
  def page_count(self):
    num_of_pages = round((len(self.collection) / self.items_per_page))
    if len(self.collection) % self.items_per_page == 0:
      return num_of_pages
    else:
      return num_of_pages + 1

  # returns the number of items on the current page. page_index is zero based
  # this method should return -1 for page_index values that are out of range
  def page_item_count(self, page_index):
    if page_index > page_count() or page_index < 0:
      return -1
    elif page_count() == page_index:
      return len(self.collection) % self.items_per_page
    else:
      return self.items_per_page

  # determines what page an item is on. Zero based indexes.
  # this method should return -1 for item_index values that are out of range
  def page_index(self, item_index):
    if item_index > len(self.collection) or item_index < 0:
      return -1
    else:
      return round(item_index / self.items_per_page)

# The following are some examples of how this class is used:
helper = PaginationHelper(['a','b','c','d','e','f'], 4)
helper.page_count # should == 2
helper.item_count # should == 6
helper.page_item_count(0)  # should == 4
helper.page_item_count(1) # last page - should == 2
helper.page_item_count(2) # should == -1 since the page is invalid

# page_index takes an item index and returns the page that it belongs on
helper.page_index(5) # should == 1 (zero based index)
helper.page_index(2) # should == 0
helper.page_index(20) # should == -1
helper.page_index(-10) # should == -1 because negative indexes are invalid



### Challenge 2: Incomplete
#Please write a simple ETL client for a fake document service.

import json

class ETLClient:
    def run(self, service, max_requests):
        """
        Handle max_requests calls to the given DocumentService.
        RetryImmediatelyError should be silently ignored and should *not*
        count as a request.
        Return document list.
        """
        documents = []
        for i in range(0, max_requests):
            event = service.handle_request()
            if event['operation'] == 'add':
                # 'add': service sends us:
                # {'operation':'add','document':{'data':'<words>','id':'<doc-id>'}}
                documents.append(event['document'])
        return json.dumps(documents)


# Requirements
# 1: run() must return a JSON string.
# See test_req_1
#
# 2: run() must return a JSON string as a dictionary, containing:
#
# 'doc-count': [integer] the number of documents received
# 'error-count':[integer] the number of errors received
# 'docs': [dictionary] keys are a document's ID string and values are arrays of words in the document
# See test_req_2
# 3: all of run()'s output words must be lower case
# See test_req_3
#
# 4: these words must not appear in the word array: and, or, not, but, to, in
# See test_req_4
#
# 5: RetryImmediatelyError.
# The service's handle_request() may raise RetryImmediatelyError.
# Do not count the error against the number of requests to run.
# Re-try the operation (by calling the handle_request() again) until successful.
# Include the number of errors in the output as in described in 2 above.
# See test_req_5
#
# 6: The service may ask you to 'update' docs. These requests will look like:
#
#   {'operation': 'update',
#     'document': {
#       'id': [string] document id
#       'data': [string] new document data
#       }
#   }
# Expect that the document ID will match an existing document previously sent by an 'add' operation.
# The document with the matching ID should have its data replaced with the data sent in the 'update' operation.
# See test_req_6
#
# 7:
# The service may ask you to 'delete' docs. These requests will look like:
#
#   {'operation': 'delete',
#     'document-id': [string] document id
#    }
# Expect that the document ID will match an existing document previously sent by an 'add' operation.
# Delete the document that matches that ID.
# See test_req_7
#
