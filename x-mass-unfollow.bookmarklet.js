/**
 * This bookmarklet automates unfollowing x accounts (beats clicking and confirming each account one by one).
 * How it works:
 * 
 * 1. Save the javascript below as a bookmark.
 * 2. Visit the 'Following' page: https://x.com/<username>/following
 * 3. Click the bookmarklet
 * 
 * It will look for and click on the unfollow buttons on the page and it will confirm in the confirmation dialog.
 * It has a randomized delay built in in order to look less suspicious. You might need to reload the page after a few minutes.
 */

javascript:(function(){function getRandomDelay(min,max){return Math.floor(Math.random()*(max-min+1))+min;}const buttons=Array.from(document.querySelectorAll('button')).filter(b=>b.textContent.trim()==='Following'||b.textContent.trim()==='Unfollow');if(buttons.length){buttons.forEach((btn,i)=>{setTimeout(function(){btn.click();setTimeout(function(){const confirmBtn=document.querySelector('button[data-testid="confirmationSheetConfirm"]');confirmBtn&&confirmBtn.click();},getRandomDelay(300,700));},i*getRandomDelay(1500,2500));});}else alert('No buttons found!')})();
