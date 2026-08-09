// gml_Object_playbuttoner_Step_0  locals=2 args=0 len=2344
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 736
00000014: conv.i.v
00000018: call action_if_number(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x20BBFD0
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.imm.e 291
0000004C: conv.i.v
00000050: call action_if_number(argc=3)
00000058: pop.v.v local.__b__
00000060: push.local.v local.__b__
00000068: conv.v.b
0000006C: bf 0x20BBFD0
00000070: push.imm.e 156
00000074: pushenv 0x20BBF48
00000078: push.imm.e 0
0000007C: conv.i.v
00000080: push.imm.e 0
00000084: conv.i.v
00000088: push.v dara
00000090: call action_if_variable(argc=3)
00000098: pop.v.v local.__b__
000000A0: push.local.v local.__b__
000000A8: conv.v.b
000000AC: bf 0x20BBF48
000000B0: b 0x20BBF50
000000B4: popenv 0x40BBF0C
000000B8: b 0x20BBF54
000000BC: popenv 0x1CBBF50
000000C0: push.local.v local.__b__
000000C8: conv.v.b
000000CC: bf 0x20BBFD0
000000D0: push.imm.e 156
000000D4: pushenv 0x20BBFA8
000000D8: push.imm.e 3
000000DC: conv.i.v
000000E0: push.imm.e 0
000000E4: conv.i.v
000000E8: push.v oil
000000F0: call action_if_variable(argc=3)
000000F8: pop.v.v local.__b__
00000100: push.local.v local.__b__
00000108: conv.v.b
0000010C: bf 0x20BBFA8
00000110: b 0x20BBFB0
00000114: popenv 0x40BBF6C
00000118: b 0x20BBFB4
0000011C: popenv 0x1CBBFB0
00000120: push.local.v local.__b__
00000128: conv.v.b
0000012C: bf 0x20BBFD0
00000130: call action_kill_object(argc=0)
00000138: popz
0000013C: push.d 0.7
00000148: pop.v.d image_alpha
00000150: push.imm.e 0
00000154: conv.i.v
00000158: push.imm.e 0
0000015C: conv.i.v
00000160: push.v play
00000168: call action_if_variable(argc=3)
00000170: pop.v.v local.__b__
00000178: push.local.v local.__b__
00000180: conv.v.b
00000184: bf 0x20BC3BC
00000188: push.imm.e 484
0000018C: pushenv 0x20BC048
00000190: push.imm.e -1
00000194: push.imm.e 0
00000198: dup 1
0000019C: push.v obj0.alarm[array]
000001A4: push.imm.e 1
000001A8: add.i.v
000001AC: pop.i.v obj0.alarm[array]
000001B4: popenv 0x40BC024
000001B8: push.imm.e 485
000001BC: pushenv 0x20BC078
000001C0: push.imm.e -1
000001C4: push.imm.e 0
000001C8: dup 1
000001CC: push.v obj0.alarm[array]
000001D4: push.imm.e 1
000001D8: add.i.v
000001DC: pop.i.v obj0.alarm[array]
000001E4: popenv 0x40BC054
000001E8: push.imm.e 2
000001EC: conv.i.v
000001F0: push.imm.e 0
000001F4: conv.i.v
000001F8: push.imm.e 489
000001FC: conv.i.v
00000200: call action_if_number(argc=3)
00000208: pop.v.v local.__b__
00000210: push.local.v local.__b__
00000218: conv.v.b
0000021C: bf 0x20BC0E4
00000220: push.imm.e 489
00000224: pushenv 0x20BC0E0
00000228: push.imm.e -1
0000022C: push.imm.e 0
00000230: dup 1
00000234: push.v obj0.alarm[array]
0000023C: push.imm.e 1
00000240: add.i.v
00000244: pop.i.v obj0.alarm[array]
0000024C: popenv 0x40BC0BC
00000250: push.imm.e 2
00000254: conv.i.v
00000258: push.imm.e 0
0000025C: conv.i.v
00000260: push.imm.e 490
00000264: conv.i.v
00000268: call action_if_number(argc=3)
00000270: pop.v.v local.__b__
00000278: push.local.v local.__b__
00000280: conv.v.b
00000284: bf 0x20BC14C
00000288: push.imm.e 490
0000028C: pushenv 0x20BC148
00000290: push.imm.e -1
00000294: push.imm.e 0
00000298: dup 1
0000029C: push.v obj0.alarm[array]
000002A4: push.imm.e 1
000002A8: add.i.v
000002AC: pop.i.v obj0.alarm[array]
000002B4: popenv 0x40BC124
000002B8: push.imm.e 2
000002BC: conv.i.v
000002C0: push.imm.e 0
000002C4: conv.i.v
000002C8: push.imm.e 491
000002CC: conv.i.v
000002D0: call action_if_number(argc=3)
000002D8: pop.v.v local.__b__
000002E0: push.local.v local.__b__
000002E8: conv.v.b
000002EC: bf 0x20BC1B4
000002F0: push.imm.e 491
000002F4: pushenv 0x20BC1B0
000002F8: push.imm.e -1
000002FC: push.imm.e 0
00000300: dup 1
00000304: push.v obj0.alarm[array]
0000030C: push.imm.e 1
00000310: add.i.v
00000314: pop.i.v obj0.alarm[array]
0000031C: popenv 0x40BC18C
00000320: push.imm.e 2
00000324: conv.i.v
00000328: push.imm.e 0
0000032C: conv.i.v
00000330: push.imm.e 488
00000334: conv.i.v
00000338: call action_if_number(argc=3)
00000340: pop.v.v local.__b__
00000348: push.local.v local.__b__
00000350: conv.v.b
00000354: bf 0x20BC21C
00000358: push.imm.e 488
0000035C: pushenv 0x20BC218
00000360: push.imm.e -1
00000364: push.imm.e 0
00000368: dup 1
0000036C: push.v obj0.alarm[array]
00000374: push.imm.e 1
00000378: add.i.v
0000037C: pop.i.v obj0.alarm[array]
00000384: popenv 0x40BC1F4
00000388: push.imm.e 2
0000038C: conv.i.v
00000390: push.imm.e 0
00000394: conv.i.v
00000398: push.imm.e 492
0000039C: conv.i.v
000003A0: call action_if_number(argc=3)
000003A8: pop.v.v local.__b__
000003B0: push.local.v local.__b__
000003B8: conv.v.b
000003BC: bf 0x20BC284
000003C0: push.imm.e 492
000003C4: pushenv 0x20BC280
000003C8: push.imm.e -1
000003CC: push.imm.e 0
000003D0: dup 1
000003D4: push.v obj0.alarm[array]
000003DC: push.imm.e 1
000003E0: add.i.v
000003E4: pop.i.v obj0.alarm[array]
000003EC: popenv 0x40BC25C
000003F0: push.imm.e 2
000003F4: conv.i.v
000003F8: push.imm.e 0
000003FC: conv.i.v
00000400: push.imm.e 486
00000404: conv.i.v
00000408: call action_if_number(argc=3)
00000410: pop.v.v local.__b__
00000418: push.local.v local.__b__
00000420: conv.v.b
00000424: bf 0x20BC2EC
00000428: push.imm.e 486
0000042C: pushenv 0x20BC2E8
00000430: push.imm.e -1
00000434: push.imm.e 0
00000438: dup 1
0000043C: push.v obj0.alarm[array]
00000444: push.imm.e 1
00000448: add.i.v
0000044C: pop.i.v obj0.alarm[array]
00000454: popenv 0x40BC2C4
00000458: push.imm.e 2
0000045C: conv.i.v
00000460: push.imm.e 0
00000464: conv.i.v
00000468: push.imm.e 487
0000046C: conv.i.v
00000470: call action_if_number(argc=3)
00000478: pop.v.v local.__b__
00000480: push.local.v local.__b__
00000488: conv.v.b
0000048C: bf 0x20BC354
00000490: push.imm.e 487
00000494: pushenv 0x20BC350
00000498: push.imm.e -1
0000049C: push.imm.e 0
000004A0: dup 1
000004A4: push.v obj0.alarm[array]
000004AC: push.imm.e 1
000004B0: add.i.v
000004B4: pop.i.v obj0.alarm[array]
000004BC: popenv 0x40BC32C
000004C0: push.imm.e 2
000004C4: conv.i.v
000004C8: push.imm.e 0
000004CC: conv.i.v
000004D0: push.imm.e 483
000004D4: conv.i.v
000004D8: call action_if_number(argc=3)
000004E0: pop.v.v local.__b__
000004E8: push.local.v local.__b__
000004F0: conv.v.b
000004F4: bf 0x20BC3BC
000004F8: push.imm.e 483
000004FC: pushenv 0x20BC3B8
00000500: push.imm.e -1
00000504: push.imm.e 0
00000508: dup 1
0000050C: push.v obj0.alarm[array]
00000514: push.imm.e 1
00000518: add.i.v
0000051C: pop.i.v obj0.alarm[array]
00000524: popenv 0x40BC394
00000528: push.imm.e 156
0000052C: pushenv 0x20BC400
00000530: push.imm.e 3
00000534: conv.i.v
00000538: push.imm.e 0
0000053C: conv.i.v
00000540: push.v mon
00000548: call action_if_variable(argc=3)
00000550: pop.v.v local.__b__
00000558: push.local.v local.__b__
00000560: conv.v.b
00000564: bf 0x20BC400
00000568: b 0x20BC408
0000056C: popenv 0x40BC3C4
00000570: b 0x20BC40C
00000574: popenv 0x1CBC408
00000578: push.local.v local.__b__
00000580: conv.v.b
00000584: bf 0x20BC7BC
00000588: push.imm.e 484
0000058C: pushenv 0x20BC448
00000590: push.imm.e -1
00000594: push.imm.e 0
00000598: dup 1
0000059C: push.v obj0.alarm[array]
000005A4: push.imm.e 1
000005A8: add.i.v
000005AC: pop.i.v obj0.alarm[array]
000005B4: popenv 0x40BC424
000005B8: push.imm.e 485
000005BC: pushenv 0x20BC478
000005C0: push.imm.e -1
000005C4: push.imm.e 0
000005C8: dup 1
000005CC: push.v obj0.alarm[array]
000005D4: push.imm.e 1
000005D8: add.i.v
000005DC: pop.i.v obj0.alarm[array]
000005E4: popenv 0x40BC454
000005E8: push.imm.e 2
000005EC: conv.i.v
000005F0: push.imm.e 0
000005F4: conv.i.v
000005F8: push.imm.e 489
000005FC: conv.i.v
00000600: call action_if_number(argc=3)
00000608: pop.v.v local.__b__
00000610: push.local.v local.__b__
00000618: conv.v.b
0000061C: bf 0x20BC4E4
00000620: push.imm.e 489
00000624: pushenv 0x20BC4E0
00000628: push.imm.e -1
0000062C: push.imm.e 0
00000630: dup 1
00000634: push.v obj0.alarm[array]
0000063C: push.imm.e 1
00000640: add.i.v
00000644: pop.i.v obj0.alarm[array]
0000064C: popenv 0x40BC4BC
00000650: push.imm.e 2
00000654: conv.i.v
00000658: push.imm.e 0
0000065C: conv.i.v
00000660: push.imm.e 490
00000664: conv.i.v
00000668: call action_if_number(argc=3)
00000670: pop.v.v local.__b__
00000678: push.local.v local.__b__
00000680: conv.v.b
00000684: bf 0x20BC54C
00000688: push.imm.e 490
0000068C: pushenv 0x20BC548
00000690: push.imm.e -1
00000694: push.imm.e 0
00000698: dup 1
0000069C: push.v obj0.alarm[array]
000006A4: push.imm.e 1
000006A8: add.i.v
000006AC: pop.i.v obj0.alarm[array]
000006B4: popenv 0x40BC524
000006B8: push.imm.e 2
000006BC: conv.i.v
000006C0: push.imm.e 0
000006C4: conv.i.v
000006C8: push.imm.e 491
000006CC: conv.i.v
000006D0: call action_if_number(argc=3)
000006D8: pop.v.v local.__b__
000006E0: push.local.v local.__b__
000006E8: conv.v.b
000006EC: bf 0x20BC5B4
000006F0: push.imm.e 491
000006F4: pushenv 0x20BC5B0
000006F8: push.imm.e -1
000006FC: push.imm.e 0
00000700: dup 1
00000704: push.v obj0.alarm[array]
0000070C: push.imm.e 1
00000710: add.i.v
00000714: pop.i.v obj0.alarm[array]
0000071C: popenv 0x40BC58C
00000720: push.imm.e 2
00000724: conv.i.v
00000728: push.imm.e 0
0000072C: conv.i.v
00000730: push.imm.e 488
00000734: conv.i.v
00000738: call action_if_number(argc=3)
00000740: pop.v.v local.__b__
00000748: push.local.v local.__b__
00000750: conv.v.b
00000754: bf 0x20BC61C
00000758: push.imm.e 488
0000075C: pushenv 0x20BC618
00000760: push.imm.e -1
00000764: push.imm.e 0
00000768: dup 1
0000076C: push.v obj0.alarm[array]
00000774: push.imm.e 1
00000778: add.i.v
0000077C: pop.i.v obj0.alarm[array]
00000784: popenv 0x40BC5F4
00000788: push.imm.e 2
0000078C: conv.i.v
00000790: push.imm.e 0
00000794: conv.i.v
00000798: push.imm.e 492
0000079C: conv.i.v
000007A0: call action_if_number(argc=3)
000007A8: pop.v.v local.__b__
000007B0: push.local.v local.__b__
000007B8: conv.v.b
000007BC: bf 0x20BC684
000007C0: push.imm.e 492
000007C4: pushenv 0x20BC680
000007C8: push.imm.e -1
000007CC: push.imm.e 0
000007D0: dup 1
000007D4: push.v obj0.alarm[array]
000007DC: push.imm.e 1
000007E0: add.i.v
000007E4: pop.i.v obj0.alarm[array]
000007EC: popenv 0x40BC65C
000007F0: push.imm.e 2
000007F4: conv.i.v
000007F8: push.imm.e 0
000007FC: conv.i.v
00000800: push.imm.e 486
00000804: conv.i.v
00000808: call action_if_number(argc=3)
00000810: pop.v.v local.__b__
00000818: push.local.v local.__b__
00000820: conv.v.b
00000824: bf 0x20BC6EC
00000828: push.imm.e 486
0000082C: pushenv 0x20BC6E8
00000830: push.imm.e -1
00000834: push.imm.e 0
00000838: dup 1
0000083C: push.v obj0.alarm[array]
00000844: push.imm.e 1
00000848: add.i.v
0000084C: pop.i.v obj0.alarm[array]
00000854: popenv 0x40BC6C4
00000858: push.imm.e 2
0000085C: conv.i.v
00000860: push.imm.e 0
00000864: conv.i.v
00000868: push.imm.e 487
0000086C: conv.i.v
00000870: call action_if_number(argc=3)
00000878: pop.v.v local.__b__
00000880: push.local.v local.__b__
00000888: conv.v.b
0000088C: bf 0x20BC754
00000890: push.imm.e 487
00000894: pushenv 0x20BC750
00000898: push.imm.e -1
0000089C: push.imm.e 0
000008A0: dup 1
000008A4: push.v obj0.alarm[array]
000008AC: push.imm.e 1
000008B0: add.i.v
000008B4: pop.i.v obj0.alarm[array]
000008BC: popenv 0x40BC72C
000008C0: push.imm.e 2
000008C4: conv.i.v
000008C8: push.imm.e 0
000008CC: conv.i.v
000008D0: push.imm.e 483
000008D4: conv.i.v
000008D8: call action_if_number(argc=3)
000008E0: pop.v.v local.__b__
000008E8: push.local.v local.__b__
000008F0: conv.v.b
000008F4: bf 0x20BC7BC
000008F8: push.imm.e 483
000008FC: pushenv 0x20BC7B8
00000900: push.imm.e -1
00000904: push.imm.e 0
00000908: dup 1
0000090C: push.v obj0.alarm[array]
00000914: push.imm.e 1
00000918: add.i.v
0000091C: pop.i.v obj0.alarm[array]
00000924: popenv 0x40BC794