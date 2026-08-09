// gml_Object_r12_Alarm_1  locals=2 args=0 len=2260
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: push.imm.e 300
0000000C: conv.i.v
00000010: call action_set_alarm(argc=2)
00000018: popz
0000001C: push.imm.e 2
00000020: conv.i.v
00000024: push.imm.e 0
00000028: conv.i.v
0000002C: push.v ondan
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: not.b.d
00000054: bf 0x20C6BF4
00000058: push.imm.e 3120
0000005C: conv.i.v
00000060: push.imm.e 380
00000064: conv.i.v
00000068: call irandom_range(argc=2)
00000070: push.imm.e -170
00000074: conv.i.v
00000078: push.imm.e 91
0000007C: conv.i.v
00000080: call action_create_object(argc=3)
00000088: popz
0000008C: push.imm.e 10
00000090: conv.i.v
00000094: call action_if_dice(argc=1)
0000009C: pop.v.v local.__b__
000000A4: push.local.v local.__b__
000000AC: conv.v.b
000000B0: bf 0x20C6408
000000B4: push.imm.e 3120
000000B8: conv.i.v
000000BC: push.imm.e 380
000000C0: conv.i.v
000000C4: call irandom_range(argc=2)
000000CC: push.imm.e -170
000000D0: conv.i.v
000000D4: push.imm.e 94
000000D8: conv.i.v
000000DC: call action_create_object(argc=3)
000000E4: popz
000000E8: push.imm.e 13
000000EC: conv.i.v
000000F0: call action_if_dice(argc=1)
000000F8: pop.v.v local.__b__
00000100: push.local.v local.__b__
00000108: conv.v.b
0000010C: bf 0x20C6464
00000110: push.imm.e 3120
00000114: conv.i.v
00000118: push.imm.e 380
0000011C: conv.i.v
00000120: call irandom_range(argc=2)
00000128: push.imm.e -170
0000012C: conv.i.v
00000130: push.imm.e 95
00000134: conv.i.v
00000138: call action_create_object(argc=3)
00000140: popz
00000144: push.imm.e 154
00000148: pushenv 0x20C64A8
0000014C: push.imm.e 4
00000150: conv.i.v
00000154: push.imm.e 3
00000158: conv.i.v
0000015C: push.v level
00000164: call action_if_variable(argc=3)
0000016C: pop.v.v local.__b__
00000174: push.local.v local.__b__
0000017C: conv.v.b
00000180: bf 0x20C64A8
00000184: b 0x20C64B0
00000188: popenv 0x40C646C
0000018C: b 0x20C64B4
00000190: popenv 0x1CC64B0
00000194: push.local.v local.__b__
0000019C: conv.v.b
000001A0: bf 0x20C6520
000001A4: push.imm.e 2
000001A8: conv.i.v
000001AC: call action_if_dice(argc=1)
000001B4: pop.v.v local.__b__
000001BC: push.local.v local.__b__
000001C4: conv.v.b
000001C8: bf 0x20C6520
000001CC: push.imm.e 3120
000001D0: conv.i.v
000001D4: push.imm.e 380
000001D8: conv.i.v
000001DC: call irandom_range(argc=2)
000001E4: push.imm.e -170
000001E8: conv.i.v
000001EC: push.imm.e 91
000001F0: conv.i.v
000001F4: call action_create_object(argc=3)
000001FC: popz
00000200: push.imm.e 154
00000204: pushenv 0x20C6564
00000208: push.imm.e 4
0000020C: conv.i.v
00000210: push.imm.e 2
00000214: conv.i.v
00000218: push.v level
00000220: call action_if_variable(argc=3)
00000228: pop.v.v local.__b__
00000230: push.local.v local.__b__
00000238: conv.v.b
0000023C: bf 0x20C6564
00000240: b 0x20C656C
00000244: popenv 0x40C6528
00000248: b 0x20C6570
0000024C: popenv 0x1CC656C
00000250: push.local.v local.__b__
00000258: conv.v.b
0000025C: bf 0x20C6614
00000260: push.imm.e 0
00000264: conv.i.v
00000268: push.imm.e 0
0000026C: conv.i.v
00000270: push.imm.e 160
00000274: conv.i.v
00000278: call action_if_number(argc=3)
00000280: pop.v.v local.__b__
00000288: push.local.v local.__b__
00000290: conv.v.b
00000294: bf 0x20C6614
00000298: push.imm.e 18
0000029C: conv.i.v
000002A0: call action_if_dice(argc=1)
000002A8: pop.v.v local.__b__
000002B0: push.local.v local.__b__
000002B8: conv.v.b
000002BC: bf 0x20C6614
000002C0: push.imm.e 3120
000002C4: conv.i.v
000002C8: push.imm.e 380
000002CC: conv.i.v
000002D0: call irandom_range(argc=2)
000002D8: push.imm.e -170
000002DC: conv.i.v
000002E0: push.imm.e 92
000002E4: conv.i.v
000002E8: call action_create_object(argc=3)
000002F0: popz
000002F4: push.imm.e 154
000002F8: pushenv 0x20C6658
000002FC: push.imm.e 4
00000300: conv.i.v
00000304: push.imm.e 2
00000308: conv.i.v
0000030C: push.v level
00000314: call action_if_variable(argc=3)
0000031C: pop.v.v local.__b__
00000324: push.local.v local.__b__
0000032C: conv.v.b
00000330: bf 0x20C6658
00000334: b 0x20C6660
00000338: popenv 0x40C661C
0000033C: b 0x20C6664
00000340: popenv 0x1CC6660
00000344: push.local.v local.__b__
0000034C: conv.v.b
00000350: bf 0x20C66D0
00000354: push.imm.e 15
00000358: conv.i.v
0000035C: call action_if_dice(argc=1)
00000364: pop.v.v local.__b__
0000036C: push.local.v local.__b__
00000374: conv.v.b
00000378: bf 0x20C66D0
0000037C: push.imm.e 3120
00000380: conv.i.v
00000384: push.imm.e 380
00000388: conv.i.v
0000038C: call irandom_range(argc=2)
00000394: push.imm.e -170
00000398: conv.i.v
0000039C: push.imm.e 93
000003A0: conv.i.v
000003A4: call action_create_object(argc=3)
000003AC: popz
000003B0: push.imm.e 0
000003B4: conv.i.v
000003B8: push.imm.e 1
000003BC: conv.i.v
000003C0: push.v spy
000003C8: call action_if_variable(argc=3)
000003D0: pop.v.v local.__b__
000003D8: push.local.v local.__b__
000003E0: conv.v.b
000003E4: bf 0x20C6BF4
000003E8: push.imm.e 4
000003EC: conv.i.v
000003F0: push.v pop
000003F8: push.v hap
00000400: call action_if_variable(argc=3)
00000408: pop.v.v local.__b__
00000410: push.local.v local.__b__
00000418: conv.v.b
0000041C: bf 0x20C699C
00000420: push.imm.e 154
00000424: pushenv 0x20C6784
00000428: push.imm.e 1
0000042C: conv.i.v
00000430: push.imm.e 3
00000434: conv.i.v
00000438: push.v level
00000440: call action_if_variable(argc=3)
00000448: pop.v.v local.__b__
00000450: push.local.v local.__b__
00000458: conv.v.b
0000045C: bf 0x20C6784
00000460: b 0x20C678C
00000464: popenv 0x40C6748
00000468: b 0x20C6790
0000046C: popenv 0x1CC678C
00000470: push.local.v local.__b__
00000478: conv.v.b
0000047C: bf 0x20C686C
00000480: push.imm.e 17
00000484: conv.i.v
00000488: call action_if_dice(argc=1)
00000490: pop.v.v local.__b__
00000498: push.local.v local.__b__
000004A0: conv.v.b
000004A4: bf 0x20C686C
000004A8: push.imm.e 0
000004AC: conv.i.v
000004B0: push.imm.e 0
000004B4: conv.i.v
000004B8: push.imm.e 162
000004BC: conv.i.v
000004C0: call action_if_number(argc=3)
000004C8: pop.v.v local.__b__
000004D0: push.local.v local.__b__
000004D8: conv.v.b
000004DC: bf 0x20C6838
000004E0: push.imm.e 1620
000004E4: conv.i.v
000004E8: push.imm.e 380
000004EC: conv.i.v
000004F0: call irandom_range(argc=2)
000004F8: push.imm.e -170
000004FC: conv.i.v
00000500: push.imm.e 96
00000504: conv.i.v
00000508: call action_create_object(argc=3)
00000510: popz
00000514: b 0x20C686C
00000518: push.imm.e 3220
0000051C: conv.i.v
00000520: push.imm.e 380
00000524: conv.i.v
00000528: call irandom_range(argc=2)
00000530: push.imm.e -170
00000534: conv.i.v
00000538: push.imm.e 96
0000053C: conv.i.v
00000540: call action_create_object(argc=3)
00000548: popz
0000054C: push.imm.e 154
00000550: pushenv 0x20C68B0
00000554: push.imm.e 0
00000558: conv.i.v
0000055C: push.imm.e 3
00000560: conv.i.v
00000564: push.v level
0000056C: call action_if_variable(argc=3)
00000574: pop.v.v local.__b__
0000057C: push.local.v local.__b__
00000584: conv.v.b
00000588: bf 0x20C68B0
0000058C: b 0x20C68B8
00000590: popenv 0x40C6874
00000594: b 0x20C68BC
00000598: popenv 0x1CC68B8
0000059C: push.local.v local.__b__
000005A4: conv.v.b
000005A8: bf 0x20C6998
000005AC: push.imm.e 17
000005B0: conv.i.v
000005B4: call action_if_dice(argc=1)
000005BC: pop.v.v local.__b__
000005C4: push.local.v local.__b__
000005CC: conv.v.b
000005D0: bf 0x20C6998
000005D4: push.imm.e 0
000005D8: conv.i.v
000005DC: push.imm.e 0
000005E0: conv.i.v
000005E4: push.imm.e 162
000005E8: conv.i.v
000005EC: call action_if_number(argc=3)
000005F4: pop.v.v local.__b__
000005FC: push.local.v local.__b__
00000604: conv.v.b
00000608: bf 0x20C6964
0000060C: push.imm.e 1620
00000610: conv.i.v
00000614: push.imm.e 380
00000618: conv.i.v
0000061C: call irandom_range(argc=2)
00000624: push.imm.e -170
00000628: conv.i.v
0000062C: push.imm.e 101
00000630: conv.i.v
00000634: call action_create_object(argc=3)
0000063C: popz
00000640: b 0x20C6998
00000644: push.imm.e 3220
00000648: conv.i.v
0000064C: push.imm.e 380
00000650: conv.i.v
00000654: call irandom_range(argc=2)
0000065C: push.imm.e -170
00000660: conv.i.v
00000664: push.imm.e 101
00000668: conv.i.v
0000066C: call action_create_object(argc=3)
00000674: popz
00000678: b 0x20C6BF4
0000067C: push.imm.e 154
00000680: pushenv 0x20C69E0
00000684: push.imm.e 1
00000688: conv.i.v
0000068C: push.imm.e 3
00000690: conv.i.v
00000694: push.v level
0000069C: call action_if_variable(argc=3)
000006A4: pop.v.v local.__b__
000006AC: push.local.v local.__b__
000006B4: conv.v.b
000006B8: bf 0x20C69E0
000006BC: b 0x20C69E8
000006C0: popenv 0x40C69A4
000006C4: b 0x20C69EC
000006C8: popenv 0x1CC69E8
000006CC: push.local.v local.__b__
000006D4: conv.v.b
000006D8: bf 0x20C6AC8
000006DC: push.imm.e 2
000006E0: conv.i.v
000006E4: call action_if_dice(argc=1)
000006EC: pop.v.v local.__b__
000006F4: push.local.v local.__b__
000006FC: conv.v.b
00000700: bf 0x20C6AC8
00000704: push.imm.e 0
00000708: conv.i.v
0000070C: push.imm.e 0
00000710: conv.i.v
00000714: push.imm.e 162
00000718: conv.i.v
0000071C: call action_if_number(argc=3)
00000724: pop.v.v local.__b__
0000072C: push.local.v local.__b__
00000734: conv.v.b
00000738: bf 0x20C6A94
0000073C: push.imm.e 1620
00000740: conv.i.v
00000744: push.imm.e 380
00000748: conv.i.v
0000074C: call irandom_range(argc=2)
00000754: push.imm.e -170
00000758: conv.i.v
0000075C: push.imm.e 96
00000760: conv.i.v
00000764: call action_create_object(argc=3)
0000076C: popz
00000770: b 0x20C6AC8
00000774: push.imm.e 3220
00000778: conv.i.v
0000077C: push.imm.e 380
00000780: conv.i.v
00000784: call irandom_range(argc=2)
0000078C: push.imm.e -170
00000790: conv.i.v
00000794: push.imm.e 96
00000798: conv.i.v
0000079C: call action_create_object(argc=3)
000007A4: popz
000007A8: push.imm.e 154
000007AC: pushenv 0x20C6B0C
000007B0: push.imm.e 0
000007B4: conv.i.v
000007B8: push.imm.e 3
000007BC: conv.i.v
000007C0: push.v level
000007C8: call action_if_variable(argc=3)
000007D0: pop.v.v local.__b__
000007D8: push.local.v local.__b__
000007E0: conv.v.b
000007E4: bf 0x20C6B0C
000007E8: b 0x20C6B14
000007EC: popenv 0x40C6AD0
000007F0: b 0x20C6B18
000007F4: popenv 0x1CC6B14
000007F8: push.local.v local.__b__
00000800: conv.v.b
00000804: bf 0x20C6BF4
00000808: push.imm.e 2
0000080C: conv.i.v
00000810: call action_if_dice(argc=1)
00000818: pop.v.v local.__b__
00000820: push.local.v local.__b__
00000828: conv.v.b
0000082C: bf 0x20C6BF4
00000830: push.imm.e 0
00000834: conv.i.v
00000838: push.imm.e 0
0000083C: conv.i.v
00000840: push.imm.e 162
00000844: conv.i.v
00000848: call action_if_number(argc=3)
00000850: pop.v.v local.__b__
00000858: push.local.v local.__b__
00000860: conv.v.b
00000864: bf 0x20C6BC0
00000868: push.imm.e 1620
0000086C: conv.i.v
00000870: push.imm.e 380
00000874: conv.i.v
00000878: call irandom_range(argc=2)
00000880: push.imm.e -170
00000884: conv.i.v
00000888: push.imm.e 101
0000088C: conv.i.v
00000890: call action_create_object(argc=3)
00000898: popz
0000089C: b 0x20C6BF4
000008A0: push.imm.e 3220
000008A4: conv.i.v
000008A8: push.imm.e 380
000008AC: conv.i.v
000008B0: call irandom_range(argc=2)
000008B8: push.imm.e -170
000008BC: conv.i.v
000008C0: push.imm.e 101
000008C4: conv.i.v
000008C8: call action_create_object(argc=3)
000008D0: popz