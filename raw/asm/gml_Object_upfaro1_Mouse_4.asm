// gml_Object_upfaro1_Mouse_4  locals=2 args=0 len=1108
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 4
00000020: conv.i.v
00000024: push.builtin.v os_type
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20B85E8
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.v phase
00000064: call action_if_variable(argc=3)
0000006C: pop.v.v local.__b__
00000074: push.local.v local.__b__
0000007C: conv.v.b
00000080: bf 0x20B8474
00000084: push.imm.e -50
00000088: conv.i.v
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.imm.e 657
00000098: conv.i.v
0000009C: call action_create_object(argc=3)
000000A4: popz
000000A8: push.imm.e 0
000000AC: conv.i.v
000000B0: call action_set_relative(argc=1)
000000B8: popz
000000BC: push.imm.e 1
000000C0: pop.v.i phase
000000C8: push.imm.e 1
000000CC: conv.i.v
000000D0: call action_set_relative(argc=1)
000000D8: popz
000000DC: b 0x20B85E8
000000E0: push.imm.e 156
000000E4: pushenv 0x20B84B8
000000E8: push.imm.e 4
000000EC: conv.i.v
000000F0: push.imm.e 2000
000000F4: conv.i.v
000000F8: push.v mon
00000100: call action_if_variable(argc=3)
00000108: pop.v.v local.__b__
00000110: push.local.v local.__b__
00000118: conv.v.b
0000011C: bf 0x20B84B8
00000120: b 0x20B84C0
00000124: popenv 0x40B847C
00000128: b 0x20B84C4
0000012C: popenv 0x1CB84C0
00000130: push.local.v local.__b__
00000138: conv.v.b
0000013C: bf 0x20B85E8
00000140: push.imm.e 0
00000144: conv.i.v
00000148: call action_set_relative(argc=1)
00000150: popz
00000154: push.imm.e 2
00000158: pop.v.i arm
00000160: push.imm.e 1
00000164: conv.i.v
00000168: call action_set_relative(argc=1)
00000170: popz
00000174: push.imm.e 156
00000178: pushenv 0x20B8528
0000017C: push.v mon
00000184: push.imm.e -2000
00000188: add.i.v
0000018C: pop.v.v mon
00000194: popenv 0x40B8510
00000198: push.imm.e 104
0000019C: pushenv 0x20B8568
000001A0: push.imm.e 0
000001A4: conv.i.v
000001A8: call action_set_relative(argc=1)
000001B0: popz
000001B4: push.imm.e 1
000001B8: pop.v.i trasformato
000001C0: push.imm.e 1
000001C4: conv.i.v
000001C8: call action_set_relative(argc=1)
000001D0: popz
000001D4: popenv 0x40B8534
000001D8: push.imm.e 104
000001DC: pushenv 0x20B8598
000001E0: push.imm.e 1
000001E4: conv.i.v
000001E8: push.imm.e 0
000001EC: conv.i.v
000001F0: push.imm.e 188
000001F4: conv.i.v
000001F8: call action_sprite_set(argc=3)
00000200: popz
00000204: popenv 0x40B8574
00000208: push.imm.e 0
0000020C: conv.i.v
00000210: push.i 65280
00000218: conv.i.v
0000021C: push.imm.e 1
00000220: conv.i.v
00000224: push.imm.e -50
00000228: conv.i.v
0000022C: push.imm.e 0
00000230: conv.i.v
00000234: push.imm.e 1
00000238: conv.i.v
0000023C: call action_effect(argc=6)
00000244: popz
00000248: call action_kill_object(argc=0)
00000250: popz
00000254: push.imm.e 156
00000258: pushenv 0x20B8624
0000025C: push.imm.e 0
00000260: conv.i.v
00000264: call action_set_relative(argc=1)
0000026C: popz
00000270: push.imm.e 0
00000274: pop.v.i selec
0000027C: push.imm.e 1
00000280: conv.i.v
00000284: call action_set_relative(argc=1)
0000028C: popz
00000290: popenv 0x40B85F0
00000294: push.imm.e 0
00000298: conv.i.v
0000029C: push.imm.e 0
000002A0: conv.i.v
000002A4: push.builtin.v os_type
000002AC: call action_if_variable(argc=3)
000002B4: pop.v.v local.__b__
000002BC: push.local.v local.__b__
000002C4: conv.v.b
000002C8: bf 0x20B87D4
000002CC: push.imm.e 156
000002D0: pushenv 0x20B86A4
000002D4: push.imm.e 4
000002D8: conv.i.v
000002DC: push.imm.e 2000
000002E0: conv.i.v
000002E4: push.v mon
000002EC: call action_if_variable(argc=3)
000002F4: pop.v.v local.__b__
000002FC: push.local.v local.__b__
00000304: conv.v.b
00000308: bf 0x20B86A4
0000030C: b 0x20B86AC
00000310: popenv 0x40B8668
00000314: b 0x20B86B0
00000318: popenv 0x1CB86AC
0000031C: push.local.v local.__b__
00000324: conv.v.b
00000328: bf 0x20B87D4
0000032C: push.imm.e 0
00000330: conv.i.v
00000334: call action_set_relative(argc=1)
0000033C: popz
00000340: push.imm.e 2
00000344: pop.v.i arm
0000034C: push.imm.e 1
00000350: conv.i.v
00000354: call action_set_relative(argc=1)
0000035C: popz
00000360: push.imm.e 156
00000364: pushenv 0x20B8714
00000368: push.v mon
00000370: push.imm.e -2000
00000374: add.i.v
00000378: pop.v.v mon
00000380: popenv 0x40B86FC
00000384: push.imm.e 104
00000388: pushenv 0x20B8754
0000038C: push.imm.e 0
00000390: conv.i.v
00000394: call action_set_relative(argc=1)
0000039C: popz
000003A0: push.imm.e 1
000003A4: pop.v.i trasformato
000003AC: push.imm.e 1
000003B0: conv.i.v
000003B4: call action_set_relative(argc=1)
000003BC: popz
000003C0: popenv 0x40B8720
000003C4: push.imm.e 104
000003C8: pushenv 0x20B8784
000003CC: push.imm.e 1
000003D0: conv.i.v
000003D4: push.imm.e 0
000003D8: conv.i.v
000003DC: push.imm.e 188
000003E0: conv.i.v
000003E4: call action_sprite_set(argc=3)
000003EC: popz
000003F0: popenv 0x40B8760
000003F4: push.imm.e 0
000003F8: conv.i.v
000003FC: push.i 65280
00000404: conv.i.v
00000408: push.imm.e 1
0000040C: conv.i.v
00000410: push.imm.e -50
00000414: conv.i.v
00000418: push.imm.e 0
0000041C: conv.i.v
00000420: push.imm.e 1
00000424: conv.i.v
00000428: call action_effect(argc=6)
00000430: popz
00000434: call action_kill_object(argc=0)
0000043C: popz
00000440: push.imm.e 0
00000444: conv.i.v
00000448: call action_set_relative(argc=1)
00000450: popz