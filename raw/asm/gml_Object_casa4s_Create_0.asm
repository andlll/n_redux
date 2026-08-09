// gml_Object_casa4s_Create_0  locals=2 args=0 len=2320
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: pop.v.i redder
00000020: push.imm.e 1
00000024: conv.i.v
00000028: call action_set_relative(argc=1)
00000030: popz
00000034: push.imm.e 0
00000038: conv.i.v
0000003C: push.imm.e 0
00000040: conv.i.v
00000044: push.imm.e 236
00000048: conv.i.v
0000004C: call action_create_object(argc=3)
00000054: popz
00000058: push.imm.e 0
0000005C: conv.i.v
00000060: call action_set_relative(argc=1)
00000068: popz
0000006C: push.imm.e 1
00000070: conv.i.v
00000074: call action_set_relative(argc=1)
0000007C: popz
00000080: push.imm.e 0
00000084: conv.i.v
00000088: push.imm.e 0
0000008C: conv.i.v
00000090: push.imm.e 469
00000094: conv.i.v
00000098: call action_create_object(argc=3)
000000A0: popz
000000A4: push.imm.e 0
000000A8: conv.i.v
000000AC: call action_set_relative(argc=1)
000000B4: popz
000000B8: push.imm.e 455
000000BC: pushenv 0x20DE1AC
000000C0: push.imm.e 0
000000C4: conv.i.v
000000C8: push.imm.e 1
000000CC: conv.i.v
000000D0: push.v night
000000D8: call action_if_variable(argc=3)
000000E0: pop.v.v local.__b__
000000E8: push.local.v local.__b__
000000F0: conv.v.b
000000F4: bf 0x20DE1AC
000000F8: b 0x20DE1B4
000000FC: popenv 0x40DE170
00000100: b 0x20DE1B8
00000104: popenv 0x1CDE1B4
00000108: push.local.v local.__b__
00000110: conv.v.b
00000114: bf 0x20DE1E8
00000118: push.imm.e 1
0000011C: conv.i.v
00000120: push.i 16366009
00000128: conv.i.v
0000012C: call action_sprite_color(argc=2)
00000134: popz
00000138: push.imm.e 455
0000013C: pushenv 0x20DE22C
00000140: push.imm.e 0
00000144: conv.i.v
00000148: push.imm.e 1
0000014C: conv.i.v
00000150: push.v dawn
00000158: call action_if_variable(argc=3)
00000160: pop.v.v local.__b__
00000168: push.local.v local.__b__
00000170: conv.v.b
00000174: bf 0x20DE22C
00000178: b 0x20DE234
0000017C: popenv 0x40DE1F0
00000180: b 0x20DE238
00000184: popenv 0x1CDE234
00000188: push.local.v local.__b__
00000190: conv.v.b
00000194: bf 0x20DE268
00000198: push.imm.e 1
0000019C: conv.i.v
000001A0: push.i 15201023
000001A8: conv.i.v
000001AC: call action_sprite_color(argc=2)
000001B4: popz
000001B8: push.imm.e 2
000001BC: conv.i.v
000001C0: push.imm.e 2000
000001C4: conv.i.v
000001C8: call action_set_alarm(argc=2)
000001D0: popz
000001D4: push.imm.e 4
000001D8: conv.i.v
000001DC: push.imm.e 600
000001E0: conv.i.v
000001E4: call action_set_alarm(argc=2)
000001EC: popz
000001F0: push.imm.e 6
000001F4: conv.i.v
000001F8: push.imm.e 960
000001FC: conv.i.v
00000200: call action_set_alarm(argc=2)
00000208: popz
0000020C: push.imm.e 5
00000210: conv.i.v
00000214: push.imm.e 34
00000218: conv.i.v
0000021C: call action_set_alarm(argc=2)
00000224: popz
00000228: push.imm.e 3
0000022C: conv.i.v
00000230: push.imm.e 120
00000234: conv.i.v
00000238: call action_set_alarm(argc=2)
00000240: popz
00000244: push.imm.e 0
00000248: pop.v.i ava
00000250: push.imm.e 400
00000254: pop.v.i life
0000025C: push.imm.e 156
00000260: pushenv 0x20DE354
00000264: push.imm.e 1
00000268: conv.i.v
0000026C: call action_set_relative(argc=1)
00000274: popz
00000278: push.v wewe
00000280: push.imm.e 100
00000284: add.i.v
00000288: pop.v.v wewe
00000290: push.imm.e 0
00000294: conv.i.v
00000298: call action_set_relative(argc=1)
000002A0: popz
000002A4: popenv 0x40DE314
000002A8: push.imm.e 156
000002AC: pushenv 0x20DE3A0
000002B0: push.imm.e 1
000002B4: conv.i.v
000002B8: call action_set_relative(argc=1)
000002C0: popz
000002C4: push.v pop
000002CC: push.imm.e 37
000002D0: add.i.v
000002D4: pop.v.v pop
000002DC: push.imm.e 0
000002E0: conv.i.v
000002E4: call action_set_relative(argc=1)
000002EC: popz
000002F0: popenv 0x40DE360
000002F4: push.v y
000002FC: neg.v.d
00000300: push.imm.e 3
00000304: add.i.v
00000308: pop.v.v depth
00000310: push.imm.e 2
00000314: conv.i.v
00000318: call action_if_dice(argc=1)
00000320: pop.v.v local.__b__
00000328: push.local.v local.__b__
00000330: conv.v.b
00000334: bf 0x20DE768
00000338: push.imm.e 2
0000033C: conv.i.v
00000340: call action_if_dice(argc=1)
00000348: pop.v.v local.__b__
00000350: push.local.v local.__b__
00000358: conv.v.b
0000035C: bf 0x20DE658
00000360: push.imm.e 2
00000364: conv.i.v
00000368: call action_if_dice(argc=1)
00000370: pop.v.v local.__b__
00000378: push.local.v local.__b__
00000380: conv.v.b
00000384: bf 0x20DE548
00000388: push.imm.e 2
0000038C: conv.i.v
00000390: call action_if_dice(argc=1)
00000398: pop.v.v local.__b__
000003A0: push.local.v local.__b__
000003A8: conv.v.b
000003AC: bf 0x20DE4D4
000003B0: push.imm.e 1
000003B4: conv.i.v
000003B8: call action_set_relative(argc=1)
000003C0: popz
000003C4: push.imm.e 0
000003C8: conv.i.v
000003CC: push.imm.e 0
000003D0: conv.i.v
000003D4: push.imm.e 387
000003D8: conv.i.v
000003DC: call action_create_object(argc=3)
000003E4: popz
000003E8: push.imm.e 0
000003EC: conv.i.v
000003F0: call action_set_relative(argc=1)
000003F8: popz
000003FC: push.imm.e 1
00000400: conv.i.v
00000404: push.imm.e 0
00000408: conv.i.v
0000040C: push.imm.e 855
00000410: conv.i.v
00000414: call action_sprite_set(argc=3)
0000041C: popz
00000420: b 0x20DE544
00000424: push.imm.e 1
00000428: conv.i.v
0000042C: call action_set_relative(argc=1)
00000434: popz
00000438: push.imm.e 0
0000043C: conv.i.v
00000440: push.imm.e 0
00000444: conv.i.v
00000448: push.imm.e 389
0000044C: conv.i.v
00000450: call action_create_object(argc=3)
00000458: popz
0000045C: push.imm.e 0
00000460: conv.i.v
00000464: call action_set_relative(argc=1)
0000046C: popz
00000470: push.imm.e 1
00000474: conv.i.v
00000478: push.imm.e 0
0000047C: conv.i.v
00000480: push.imm.e 861
00000484: conv.i.v
00000488: call action_sprite_set(argc=3)
00000490: popz
00000494: b 0x20DE654
00000498: push.imm.e 2
0000049C: conv.i.v
000004A0: call action_if_dice(argc=1)
000004A8: pop.v.v local.__b__
000004B0: push.local.v local.__b__
000004B8: conv.v.b
000004BC: bf 0x20DE5E4
000004C0: push.imm.e 1
000004C4: conv.i.v
000004C8: call action_set_relative(argc=1)
000004D0: popz
000004D4: push.imm.e 0
000004D8: conv.i.v
000004DC: push.imm.e 0
000004E0: conv.i.v
000004E4: push.imm.e 391
000004E8: conv.i.v
000004EC: call action_create_object(argc=3)
000004F4: popz
000004F8: push.imm.e 0
000004FC: conv.i.v
00000500: call action_set_relative(argc=1)
00000508: popz
0000050C: push.imm.e 1
00000510: conv.i.v
00000514: push.imm.e 0
00000518: conv.i.v
0000051C: push.imm.e 867
00000520: conv.i.v
00000524: call action_sprite_set(argc=3)
0000052C: popz
00000530: b 0x20DE654
00000534: push.imm.e 1
00000538: conv.i.v
0000053C: call action_set_relative(argc=1)
00000544: popz
00000548: push.imm.e 0
0000054C: conv.i.v
00000550: push.imm.e 0
00000554: conv.i.v
00000558: push.imm.e 393
0000055C: conv.i.v
00000560: call action_create_object(argc=3)
00000568: popz
0000056C: push.imm.e 0
00000570: conv.i.v
00000574: call action_set_relative(argc=1)
0000057C: popz
00000580: push.imm.e 1
00000584: conv.i.v
00000588: push.imm.e 0
0000058C: conv.i.v
00000590: push.imm.e 873
00000594: conv.i.v
00000598: call action_sprite_set(argc=3)
000005A0: popz
000005A4: b 0x20DE764
000005A8: push.imm.e 2
000005AC: conv.i.v
000005B0: call action_if_dice(argc=1)
000005B8: pop.v.v local.__b__
000005C0: push.local.v local.__b__
000005C8: conv.v.b
000005CC: bf 0x20DE6F4
000005D0: push.imm.e 1
000005D4: conv.i.v
000005D8: call action_set_relative(argc=1)
000005E0: popz
000005E4: push.imm.e 0
000005E8: conv.i.v
000005EC: push.imm.e 0
000005F0: conv.i.v
000005F4: push.imm.e 395
000005F8: conv.i.v
000005FC: call action_create_object(argc=3)
00000604: popz
00000608: push.imm.e 0
0000060C: conv.i.v
00000610: call action_set_relative(argc=1)
00000618: popz
0000061C: push.imm.e 1
00000620: conv.i.v
00000624: push.imm.e 0
00000628: conv.i.v
0000062C: push.imm.e 879
00000630: conv.i.v
00000634: call action_sprite_set(argc=3)
0000063C: popz
00000640: b 0x20DE764
00000644: push.imm.e 1
00000648: conv.i.v
0000064C: call action_set_relative(argc=1)
00000654: popz
00000658: push.imm.e 0
0000065C: conv.i.v
00000660: push.imm.e 0
00000664: conv.i.v
00000668: push.imm.e 397
0000066C: conv.i.v
00000670: call action_create_object(argc=3)
00000678: popz
0000067C: push.imm.e 0
00000680: conv.i.v
00000684: call action_set_relative(argc=1)
0000068C: popz
00000690: push.imm.e 1
00000694: conv.i.v
00000698: push.imm.e 0
0000069C: conv.i.v
000006A0: push.imm.e 885
000006A4: conv.i.v
000006A8: call action_sprite_set(argc=3)
000006B0: popz
000006B4: b 0x20DE9AC
000006B8: push.imm.e 2
000006BC: conv.i.v
000006C0: call action_if_dice(argc=1)
000006C8: pop.v.v local.__b__
000006D0: push.local.v local.__b__
000006D8: conv.v.b
000006DC: bf 0x20DE8A0
000006E0: push.imm.e 2
000006E4: conv.i.v
000006E8: call action_if_dice(argc=1)
000006F0: pop.v.v local.__b__
000006F8: push.local.v local.__b__
00000700: conv.v.b
00000704: bf 0x20DE82C
00000708: push.imm.e 1
0000070C: conv.i.v
00000710: call action_set_relative(argc=1)
00000718: popz
0000071C: push.imm.e 0
00000720: conv.i.v
00000724: push.imm.e 0
00000728: conv.i.v
0000072C: push.imm.e 399
00000730: conv.i.v
00000734: call action_create_object(argc=3)
0000073C: popz
00000740: push.imm.e 0
00000744: conv.i.v
00000748: call action_set_relative(argc=1)
00000750: popz
00000754: push.imm.e 1
00000758: conv.i.v
0000075C: push.imm.e 0
00000760: conv.i.v
00000764: push.imm.e 891
00000768: conv.i.v
0000076C: call action_sprite_set(argc=3)
00000774: popz
00000778: b 0x20DE89C
0000077C: push.imm.e 1
00000780: conv.i.v
00000784: call action_set_relative(argc=1)
0000078C: popz
00000790: push.imm.e 0
00000794: conv.i.v
00000798: push.imm.e 0
0000079C: conv.i.v
000007A0: push.imm.e 401
000007A4: conv.i.v
000007A8: call action_create_object(argc=3)
000007B0: popz
000007B4: push.imm.e 0
000007B8: conv.i.v
000007BC: call action_set_relative(argc=1)
000007C4: popz
000007C8: push.imm.e 1
000007CC: conv.i.v
000007D0: push.imm.e 0
000007D4: conv.i.v
000007D8: push.imm.e 897
000007DC: conv.i.v
000007E0: call action_sprite_set(argc=3)
000007E8: popz
000007EC: b 0x20DE9AC
000007F0: push.imm.e 2
000007F4: conv.i.v
000007F8: call action_if_dice(argc=1)
00000800: pop.v.v local.__b__
00000808: push.local.v local.__b__
00000810: conv.v.b
00000814: bf 0x20DE93C
00000818: push.imm.e 1
0000081C: conv.i.v
00000820: call action_set_relative(argc=1)
00000828: popz
0000082C: push.imm.e 0
00000830: conv.i.v
00000834: push.imm.e 0
00000838: conv.i.v
0000083C: push.imm.e 403
00000840: conv.i.v
00000844: call action_create_object(argc=3)
0000084C: popz
00000850: push.imm.e 0
00000854: conv.i.v
00000858: call action_set_relative(argc=1)
00000860: popz
00000864: push.imm.e 1
00000868: conv.i.v
0000086C: push.imm.e 0
00000870: conv.i.v
00000874: push.imm.e 903
00000878: conv.i.v
0000087C: call action_sprite_set(argc=3)
00000884: popz
00000888: b 0x20DE9AC
0000088C: push.imm.e 1
00000890: conv.i.v
00000894: call action_set_relative(argc=1)
0000089C: popz
000008A0: push.imm.e 0
000008A4: conv.i.v
000008A8: push.imm.e 0
000008AC: conv.i.v
000008B0: push.imm.e 405
000008B4: conv.i.v
000008B8: call action_create_object(argc=3)
000008C0: popz
000008C4: push.imm.e 0
000008C8: conv.i.v
000008CC: call action_set_relative(argc=1)
000008D4: popz
000008D8: push.imm.e 1
000008DC: conv.i.v
000008E0: push.imm.e 0
000008E4: conv.i.v
000008E8: push.imm.e 909
000008EC: conv.i.v
000008F0: call action_sprite_set(argc=3)
000008F8: popz
000008FC: push.imm.e 0
00000900: conv.i.v
00000904: call action_set_relative(argc=1)
0000090C: popz