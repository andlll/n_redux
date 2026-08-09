// gml_Object_r32_Create_0  locals=2 args=0 len=968
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 455
00000018: pushenv 0x20CA6AC
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 1
00000028: conv.i.v
0000002C: push.v night
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x20CA6AC
00000054: b 0x20CA6B4
00000058: popenv 0x40CA670
0000005C: b 0x20CA6B8
00000060: popenv 0x1CCA6B4
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x20CA6E8
00000074: push.imm.e 1
00000078: conv.i.v
0000007C: push.i 16366009
00000084: conv.i.v
00000088: call action_sprite_color(argc=2)
00000090: popz
00000094: push.imm.e 455
00000098: pushenv 0x20CA72C
0000009C: push.imm.e 0
000000A0: conv.i.v
000000A4: push.imm.e 1
000000A8: conv.i.v
000000AC: push.v dawn
000000B4: call action_if_variable(argc=3)
000000BC: pop.v.v local.__b__
000000C4: push.local.v local.__b__
000000CC: conv.v.b
000000D0: bf 0x20CA72C
000000D4: b 0x20CA734
000000D8: popenv 0x40CA6F0
000000DC: b 0x20CA738
000000E0: popenv 0x1CCA734
000000E4: push.local.v local.__b__
000000EC: conv.v.b
000000F0: bf 0x20CA768
000000F4: push.imm.e 1
000000F8: conv.i.v
000000FC: push.i 15201023
00000104: conv.i.v
00000108: call action_sprite_color(argc=2)
00000110: popz
00000114: push.imm.e 1959
00000118: conv.i.v
0000011C: push.imm.e 472
00000120: conv.i.v
00000124: push.imm.e 61
00000128: conv.i.v
0000012C: call action_create_object(argc=3)
00000134: popz
00000138: push.imm.e 0
0000013C: pop.v.i maghene
00000144: push.imm.e 4
00000148: conv.i.v
0000014C: push.imm.e 8750
00000150: conv.i.v
00000154: call action_set_alarm(argc=2)
0000015C: popz
00000160: push.imm.e 1
00000164: conv.i.v
00000168: call action_set_relative(argc=1)
00000170: popz
00000174: push.imm.e 0
00000178: conv.i.v
0000017C: push.imm.e 1616
00000180: conv.i.v
00000184: push.imm.e 162
00000188: conv.i.v
0000018C: call action_create_object(argc=3)
00000194: popz
00000198: push.imm.e 0
0000019C: conv.i.v
000001A0: call action_set_relative(argc=1)
000001A8: popz
000001AC: push.imm.e 465
000001B0: conv.i.v
000001B4: push.v y
000001BC: push.imm.e 416
000001C0: add.i.v
000001C4: push.v x
000001CC: push.imm.e 181
000001D0: add.i.v
000001D4: call instance_create(argc=3)
000001DC: popz
000001E0: push.imm.e 465
000001E4: conv.i.v
000001E8: push.v y
000001F0: push.imm.e 559
000001F4: add.i.v
000001F8: push.v x
00000200: push.imm.e 429
00000204: add.i.v
00000208: call instance_create(argc=3)
00000210: popz
00000214: push.imm.e 465
00000218: conv.i.v
0000021C: push.v y
00000224: push.imm.e 531
00000228: add.i.v
0000022C: push.v x
00000234: push.imm.e 478
00000238: add.i.v
0000023C: call instance_create(argc=3)
00000244: popz
00000248: push.imm.e 465
0000024C: conv.i.v
00000250: push.v y
00000258: push.imm.e 559
0000025C: add.i.v
00000260: push.v x
00000268: push.imm.e 530
0000026C: add.i.v
00000270: call instance_create(argc=3)
00000278: popz
0000027C: push.imm.e 465
00000280: conv.i.v
00000284: push.v y
0000028C: push.imm.e 596
00000290: add.i.v
00000294: push.v x
0000029C: push.imm.e 478
000002A0: add.i.v
000002A4: call instance_create(argc=3)
000002AC: popz
000002B0: push.imm.e 465
000002B4: conv.i.v
000002B8: push.v y
000002C0: push.imm.e 414
000002C4: add.i.v
000002C8: push.v x
000002D0: push.imm.e 778
000002D4: add.i.v
000002D8: call instance_create(argc=3)
000002E0: popz
000002E4: push.imm.e 465
000002E8: conv.i.v
000002EC: push.v y
000002F4: push.imm.e 703
000002F8: add.i.v
000002FC: push.v x
00000304: push.imm.e 678
00000308: add.i.v
0000030C: call instance_create(argc=3)
00000314: popz
00000318: push.imm.e 465
0000031C: conv.i.v
00000320: push.v y
00000328: push.imm.e 673
0000032C: add.i.v
00000330: push.v x
00000338: push.imm.e 728
0000033C: add.i.v
00000340: call instance_create(argc=3)
00000348: popz
0000034C: push.imm.e 465
00000350: conv.i.v
00000354: push.v y
0000035C: push.imm.e 441
00000360: add.i.v
00000364: push.v x
0000036C: push.imm.e 1223
00000370: add.i.v
00000374: call instance_create(argc=3)
0000037C: popz
00000380: push.imm.e 465
00000384: conv.i.v
00000388: push.v y
00000390: push.imm.e 415
00000394: add.i.v
00000398: push.v x
000003A0: push.imm.e 1371
000003A4: add.i.v
000003A8: call instance_create(argc=3)
000003B0: popz
000003B4: push.imm.e 0
000003B8: conv.i.v
000003BC: call action_set_relative(argc=1)
000003C4: popz