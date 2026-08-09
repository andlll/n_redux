// gml_Object_upsign12_Mouse_4  locals=2 args=0 len=1300
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 156
00000018: pushenv 0x20F771C
0000001C: push.imm.e 0
00000020: pop.v.i selec
00000028: popenv 0x40F7710
0000002C: push.imm.e 0
00000030: conv.i.v
00000034: push.imm.e 0
00000038: conv.i.v
0000003C: push.builtin.v os_type
00000044: call action_if_variable(argc=3)
0000004C: pop.v.v local.__b__
00000054: push.local.v local.__b__
0000005C: conv.v.b
00000060: bf 0x20F7940
00000064: push.imm.e 156
00000068: pushenv 0x20F779C
0000006C: push.imm.e 4
00000070: conv.i.v
00000074: push.imm.e 500
00000078: conv.i.v
0000007C: push.v mon
00000084: call action_if_variable(argc=3)
0000008C: pop.v.v local.__b__
00000094: push.local.v local.__b__
0000009C: conv.v.b
000000A0: bf 0x20F779C
000000A4: b 0x20F77A4
000000A8: popenv 0x40F7760
000000AC: b 0x20F77A8
000000B0: popenv 0x1CF77A4
000000B4: push.local.v local.__b__
000000BC: conv.v.b
000000C0: bf 0x20F7940
000000C4: push.imm.e 1
000000C8: conv.i.v
000000CC: push.imm.e 0
000000D0: conv.i.v
000000D4: push.imm.e 1321
000000D8: conv.i.v
000000DC: call action_sprite_set(argc=3)
000000E4: popz
000000E8: push.imm.e 2
000000EC: pop.v.i arm
000000F4: push.imm.e 156
000000F8: pushenv 0x20F7830
000000FC: push.imm.e 1
00000100: conv.i.v
00000104: call action_set_relative(argc=1)
0000010C: popz
00000110: push.v mon
00000118: push.imm.e -500
0000011C: add.i.v
00000120: pop.v.v mon
00000128: push.imm.e 0
0000012C: conv.i.v
00000130: call action_set_relative(argc=1)
00000138: popz
0000013C: popenv 0x40F77F0
00000140: push.imm.e 1
00000144: conv.i.v
00000148: call action_set_relative(argc=1)
00000150: popz
00000154: push.imm.e 0
00000158: conv.i.v
0000015C: push.i 3989790
00000164: conv.i.v
00000168: push.imm.e 1
0000016C: conv.i.v
00000170: push.imm.e -50
00000174: conv.i.v
00000178: push.imm.e 0
0000017C: conv.i.v
00000180: push.imm.e 1
00000184: conv.i.v
00000188: call action_effect(argc=6)
00000190: popz
00000194: push.imm.e 0
00000198: conv.i.v
0000019C: call action_set_relative(argc=1)
000001A4: popz
000001A8: push.imm.e 1
000001AC: conv.i.v
000001B0: call action_set_relative(argc=1)
000001B8: popz
000001BC: push.imm.e 0
000001C0: conv.i.v
000001C4: push.imm.e 0
000001C8: conv.i.v
000001CC: push.imm.e 506
000001D0: conv.i.v
000001D4: call action_create_object(argc=3)
000001DC: popz
000001E0: push.imm.e 0
000001E4: conv.i.v
000001E8: call action_set_relative(argc=1)
000001F0: popz
000001F4: push.imm.e 1
000001F8: conv.i.v
000001FC: call action_set_relative(argc=1)
00000204: popz
00000208: push.imm.e 0
0000020C: conv.i.v
00000210: push.imm.e 0
00000214: conv.i.v
00000218: push.imm.e 240
0000021C: conv.i.v
00000220: call action_create_object(argc=3)
00000228: popz
0000022C: push.imm.e 0
00000230: conv.i.v
00000234: call action_set_relative(argc=1)
0000023C: popz
00000240: call action_kill_object(argc=0)
00000248: popz
0000024C: push.imm.e 0
00000250: conv.i.v
00000254: push.imm.e 4
00000258: conv.i.v
0000025C: push.builtin.v os_type
00000264: call action_if_variable(argc=3)
0000026C: pop.v.v local.__b__
00000274: push.local.v local.__b__
0000027C: conv.v.b
00000280: bf 0x20F7BF4
00000284: push.imm.e 0
00000288: conv.i.v
0000028C: push.imm.e 0
00000290: conv.i.v
00000294: push.v phase
0000029C: call action_if_variable(argc=3)
000002A4: pop.v.v local.__b__
000002AC: push.local.v local.__b__
000002B4: conv.v.b
000002B8: bf 0x20F7A0C
000002BC: push.imm.e 1
000002C0: conv.i.v
000002C4: call action_set_relative(argc=1)
000002CC: popz
000002D0: push.imm.e -50
000002D4: conv.i.v
000002D8: push.imm.e 0
000002DC: conv.i.v
000002E0: push.imm.e 653
000002E4: conv.i.v
000002E8: call action_create_object(argc=3)
000002F0: popz
000002F4: push.imm.e 0
000002F8: conv.i.v
000002FC: call action_set_relative(argc=1)
00000304: popz
00000308: push.imm.e 1
0000030C: pop.v.i phase
00000314: b 0x20F7BF4
00000318: push.imm.e 156
0000031C: pushenv 0x20F7A50
00000320: push.imm.e 4
00000324: conv.i.v
00000328: push.imm.e 500
0000032C: conv.i.v
00000330: push.v mon
00000338: call action_if_variable(argc=3)
00000340: pop.v.v local.__b__
00000348: push.local.v local.__b__
00000350: conv.v.b
00000354: bf 0x20F7A50
00000358: b 0x20F7A58
0000035C: popenv 0x40F7A14
00000360: b 0x20F7A5C
00000364: popenv 0x1CF7A58
00000368: push.local.v local.__b__
00000370: conv.v.b
00000374: bf 0x20F7BF4
00000378: push.imm.e 1
0000037C: conv.i.v
00000380: push.imm.e 0
00000384: conv.i.v
00000388: push.imm.e 1321
0000038C: conv.i.v
00000390: call action_sprite_set(argc=3)
00000398: popz
0000039C: push.imm.e 2
000003A0: pop.v.i arm
000003A8: push.imm.e 156
000003AC: pushenv 0x20F7AE4
000003B0: push.imm.e 1
000003B4: conv.i.v
000003B8: call action_set_relative(argc=1)
000003C0: popz
000003C4: push.v mon
000003CC: push.imm.e -500
000003D0: add.i.v
000003D4: pop.v.v mon
000003DC: push.imm.e 0
000003E0: conv.i.v
000003E4: call action_set_relative(argc=1)
000003EC: popz
000003F0: popenv 0x40F7AA4
000003F4: push.imm.e 1
000003F8: conv.i.v
000003FC: call action_set_relative(argc=1)
00000404: popz
00000408: push.imm.e 0
0000040C: conv.i.v
00000410: push.i 3989790
00000418: conv.i.v
0000041C: push.imm.e 1
00000420: conv.i.v
00000424: push.imm.e -50
00000428: conv.i.v
0000042C: push.imm.e 0
00000430: conv.i.v
00000434: push.imm.e 1
00000438: conv.i.v
0000043C: call action_effect(argc=6)
00000444: popz
00000448: push.imm.e 0
0000044C: conv.i.v
00000450: call action_set_relative(argc=1)
00000458: popz
0000045C: push.imm.e 1
00000460: conv.i.v
00000464: call action_set_relative(argc=1)
0000046C: popz
00000470: push.imm.e 0
00000474: conv.i.v
00000478: push.imm.e 0
0000047C: conv.i.v
00000480: push.imm.e 506
00000484: conv.i.v
00000488: call action_create_object(argc=3)
00000490: popz
00000494: push.imm.e 0
00000498: conv.i.v
0000049C: call action_set_relative(argc=1)
000004A4: popz
000004A8: push.imm.e 1
000004AC: conv.i.v
000004B0: call action_set_relative(argc=1)
000004B8: popz
000004BC: push.imm.e 0
000004C0: conv.i.v
000004C4: push.imm.e 0
000004C8: conv.i.v
000004CC: push.imm.e 240
000004D0: conv.i.v
000004D4: call action_create_object(argc=3)
000004DC: popz
000004E0: push.imm.e 0
000004E4: conv.i.v
000004E8: call action_set_relative(argc=1)
000004F0: popz
000004F4: call action_kill_object(argc=0)
000004FC: popz
00000500: push.imm.e 0
00000504: conv.i.v
00000508: call action_set_relative(argc=1)
00000510: popz