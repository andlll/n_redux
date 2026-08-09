// gml_Object_chies_Step_0  locals=2 args=0 len=1416
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 2
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 617
00000028: conv.i.v
0000002C: call action_if_number(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20C3598
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.v updue
00000064: call action_if_variable(argc=3)
0000006C: pop.v.v local.__b__
00000074: push.local.v local.__b__
0000007C: conv.v.b
00000080: bf 0x20C3598
00000084: push.imm.e 156
00000088: pushenv 0x20C3524
0000008C: push.imm.e 4
00000090: conv.i.v
00000094: push.imm.e 500
00000098: conv.i.v
0000009C: push.v pop
000000A4: call action_if_variable(argc=3)
000000AC: pop.v.v local.__b__
000000B4: push.local.v local.__b__
000000BC: conv.v.b
000000C0: bf 0x20C3524
000000C4: b 0x20C352C
000000C8: popenv 0x40C34E8
000000CC: b 0x20C3530
000000D0: popenv 0x1CC352C
000000D4: push.local.v local.__b__
000000DC: conv.v.b
000000E0: bf 0x20C3598
000000E4: push.imm.e 0
000000E8: conv.i.v
000000EC: push.imm.e 0
000000F0: conv.i.v
000000F4: push.imm.e 232
000000F8: conv.i.v
000000FC: call action_create_object(argc=3)
00000104: popz
00000108: push.imm.e 0
0000010C: conv.i.v
00000110: call action_set_relative(argc=1)
00000118: popz
0000011C: push.imm.e 1
00000120: pop.v.i updue
00000128: push.imm.e 1
0000012C: conv.i.v
00000130: call action_set_relative(argc=1)
00000138: popz
0000013C: push.imm.e 0
00000140: conv.i.v
00000144: push.imm.e 0
00000148: conv.i.v
0000014C: push.v uptre
00000154: call action_if_variable(argc=3)
0000015C: pop.v.v local.__b__
00000164: push.local.v local.__b__
0000016C: conv.v.b
00000170: bf 0x20C36C4
00000174: push.imm.e 2
00000178: conv.i.v
0000017C: push.imm.e 0
00000180: conv.i.v
00000184: push.imm.e 736
00000188: conv.i.v
0000018C: call action_if_number(argc=3)
00000194: pop.v.v local.__b__
0000019C: push.local.v local.__b__
000001A4: conv.v.b
000001A8: not.b.d
000001AC: bf 0x20C36C4
000001B0: push.imm.e 156
000001B4: pushenv 0x20C3650
000001B8: push.imm.e 4
000001BC: conv.i.v
000001C0: push.imm.e 1500
000001C4: conv.i.v
000001C8: push.v pop
000001D0: call action_if_variable(argc=3)
000001D8: pop.v.v local.__b__
000001E0: push.local.v local.__b__
000001E8: conv.v.b
000001EC: bf 0x20C3650
000001F0: b 0x20C3658
000001F4: popenv 0x40C3614
000001F8: b 0x20C365C
000001FC: popenv 0x1CC3658
00000200: push.local.v local.__b__
00000208: conv.v.b
0000020C: bf 0x20C36C4
00000210: push.imm.e 0
00000214: conv.i.v
00000218: push.imm.e 0
0000021C: conv.i.v
00000220: push.imm.e 234
00000224: conv.i.v
00000228: call action_create_object(argc=3)
00000230: popz
00000234: push.imm.e 0
00000238: conv.i.v
0000023C: call action_set_relative(argc=1)
00000244: popz
00000248: push.imm.e 1
0000024C: pop.v.i uptre
00000254: push.imm.e 1
00000258: conv.i.v
0000025C: call action_set_relative(argc=1)
00000264: popz
00000268: push.imm.e 3
0000026C: conv.i.v
00000270: push.imm.e 0
00000274: conv.i.v
00000278: push.v life
00000280: call action_if_variable(argc=3)
00000288: pop.v.v local.__b__
00000290: push.local.v local.__b__
00000298: conv.v.b
0000029C: bf 0x20C393C
000002A0: push.imm.e 0
000002A4: conv.i.v
000002A8: push.imm.e 0
000002AC: conv.i.v
000002B0: push.v distrutta
000002B8: call action_if_variable(argc=3)
000002C0: pop.v.v local.__b__
000002C8: push.local.v local.__b__
000002D0: conv.v.b
000002D4: bf 0x20C393C
000002D8: push.imm.e 131
000002DC: pushenv 0x20C3748
000002E0: call action_kill_object(argc=0)
000002E8: popz
000002EC: popenv 0x40C373C
000002F0: push.imm.e 336
000002F4: pushenv 0x20C3760
000002F8: call action_kill_object(argc=0)
00000300: popz
00000304: popenv 0x40C3754
00000308: push.imm.e 337
0000030C: pushenv 0x20C3778
00000310: call action_kill_object(argc=0)
00000318: popz
0000031C: popenv 0x40C376C
00000320: push.imm.e 338
00000324: pushenv 0x20C3790
00000328: call action_kill_object(argc=0)
00000330: popz
00000334: popenv 0x40C3784
00000338: push.imm.e 339
0000033C: pushenv 0x20C37A8
00000340: call action_kill_object(argc=0)
00000348: popz
0000034C: popenv 0x40C379C
00000350: push.imm.e 340
00000354: pushenv 0x20C37C0
00000358: call action_kill_object(argc=0)
00000360: popz
00000364: popenv 0x40C37B4
00000368: push.imm.e 341
0000036C: pushenv 0x20C37D8
00000370: call action_kill_object(argc=0)
00000378: popz
0000037C: popenv 0x40C37CC
00000380: push.imm.e 342
00000384: pushenv 0x20C37F0
00000388: call action_kill_object(argc=0)
00000390: popz
00000394: popenv 0x40C37E4
00000398: push.imm.e 0
0000039C: conv.i.v
000003A0: call action_set_relative(argc=1)
000003A8: popz
000003AC: push.imm.e 1
000003B0: pop.v.i distrutta
000003B8: push.imm.e 1
000003BC: conv.i.v
000003C0: call action_set_relative(argc=1)
000003C8: popz
000003CC: push.imm.e 0
000003D0: conv.i.v
000003D4: push.imm.e 1
000003D8: conv.i.v
000003DC: push.v level
000003E4: call action_if_variable(argc=3)
000003EC: pop.v.v local.__b__
000003F4: push.local.v local.__b__
000003FC: conv.v.b
00000400: bf 0x20C3884
00000404: push.imm.e 1
00000408: conv.i.v
0000040C: push.imm.e 0
00000410: conv.i.v
00000414: push.imm.e 372
00000418: conv.i.v
0000041C: call action_sprite_set(argc=3)
00000424: popz
00000428: push.imm.e 0
0000042C: conv.i.v
00000430: push.imm.e 2
00000434: conv.i.v
00000438: push.v level
00000440: call action_if_variable(argc=3)
00000448: pop.v.v local.__b__
00000450: push.local.v local.__b__
00000458: conv.v.b
0000045C: bf 0x20C38E0
00000460: push.imm.e 1
00000464: conv.i.v
00000468: push.imm.e 0
0000046C: conv.i.v
00000470: push.imm.e 373
00000474: conv.i.v
00000478: call action_sprite_set(argc=3)
00000480: popz
00000484: push.imm.e 0
00000488: conv.i.v
0000048C: push.imm.e 3
00000490: conv.i.v
00000494: push.v level
0000049C: call action_if_variable(argc=3)
000004A4: pop.v.v local.__b__
000004AC: push.local.v local.__b__
000004B4: conv.v.b
000004B8: bf 0x20C393C
000004BC: push.imm.e 1
000004C0: conv.i.v
000004C4: push.imm.e 0
000004C8: conv.i.v
000004CC: push.imm.e 374
000004D0: conv.i.v
000004D4: call action_sprite_set(argc=3)
000004DC: popz
000004E0: push.imm.e 0
000004E4: conv.i.v
000004E8: push.imm.e 2
000004EC: conv.i.v
000004F0: push.v level
000004F8: call action_if_variable(argc=3)
00000500: pop.v.v local.__b__
00000508: push.local.v local.__b__
00000510: conv.v.b
00000514: bf 0x20C39D0
00000518: push.imm.e 0
0000051C: conv.i.v
00000520: push.imm.e 0
00000524: conv.i.v
00000528: push.imm.e 131
0000052C: conv.i.v
00000530: call action_if_number(argc=3)
00000538: pop.v.v local.__b__
00000540: push.local.v local.__b__
00000548: conv.v.b
0000054C: bf 0x20C39D0
00000550: push.imm.e 30
00000554: conv.i.v
00000558: push.imm.e -60
0000055C: conv.i.v
00000560: push.imm.e 131
00000564: conv.i.v
00000568: call action_create_object(argc=3)
00000570: popz
00000574: push.imm.e 0
00000578: conv.i.v
0000057C: call action_set_relative(argc=1)
00000584: popz