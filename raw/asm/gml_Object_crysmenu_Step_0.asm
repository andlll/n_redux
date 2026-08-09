// gml_Object_crysmenu_Step_0  locals=2 args=0 len=1340
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
00000034: bf 0x21EECD8
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
0000006C: bf 0x21EECD8
00000070: push.imm.e 156
00000074: pushenv 0x21EEC50
00000078: push.imm.e 0
0000007C: conv.i.v
00000080: push.imm.e 0
00000084: conv.i.v
00000088: push.v dara
00000090: call action_if_variable(argc=3)
00000098: pop.v.v local.__b__
000000A0: push.local.v local.__b__
000000A8: conv.v.b
000000AC: bf 0x21EEC50
000000B0: b 0x21EEC58
000000B4: popenv 0x41EEC14
000000B8: b 0x21EEC5C
000000BC: popenv 0x1DEEC58
000000C0: push.local.v local.__b__
000000C8: conv.v.b
000000CC: bf 0x21EECD8
000000D0: push.imm.e 156
000000D4: pushenv 0x21EECB0
000000D8: push.imm.e 3
000000DC: conv.i.v
000000E0: push.imm.e 0
000000E4: conv.i.v
000000E8: push.v oil
000000F0: call action_if_variable(argc=3)
000000F8: pop.v.v local.__b__
00000100: push.local.v local.__b__
00000108: conv.v.b
0000010C: bf 0x21EECB0
00000110: b 0x21EECB8
00000114: popenv 0x41EEC74
00000118: b 0x21EECBC
0000011C: popenv 0x1DEECB8
00000120: push.local.v local.__b__
00000128: conv.v.b
0000012C: bf 0x21EECD8
00000130: call action_kill_object(argc=0)
00000138: popz
0000013C: push.imm.e 0
00000140: conv.i.v
00000144: push.imm.e 0
00000148: conv.i.v
0000014C: push.global.v global.sca
00000154: push.global.v global.sca
0000015C: call action_sprite_transform(argc=4)
00000164: popz
00000168: push.imm.e -1
0000016C: push.imm.e 0
00000170: push.v obj0.view_yview[array]
00000178: push.imm.e 60
0000017C: push.global.v global.sca
00000184: mul.v.i
00000188: add.v.v
0000018C: push.imm.e -1
00000190: push.imm.e 0
00000194: push.v obj0.view_xview[array]
0000019C: call action_move_to(argc=2)
000001A4: popz
000001A8: push.imm.e 156
000001AC: pushenv 0x21EED88
000001B0: push.imm.e 2
000001B4: conv.i.v
000001B8: push.imm.e 0
000001BC: conv.i.v
000001C0: push.v crys
000001C8: call action_if_variable(argc=3)
000001D0: pop.v.v local.__b__
000001D8: push.local.v local.__b__
000001E0: conv.v.b
000001E4: bf 0x21EED88
000001E8: b 0x21EED90
000001EC: popenv 0x41EED4C
000001F0: b 0x21EED94
000001F4: popenv 0x1DEED90
000001F8: push.local.v local.__b__
00000200: conv.v.b
00000204: bf 0x21EEE28
00000208: push.imm.e 0
0000020C: conv.i.v
00000210: push.imm.e 0
00000214: conv.i.v
00000218: push.v cambiato
00000220: call action_if_variable(argc=3)
00000228: pop.v.v local.__b__
00000230: push.local.v local.__b__
00000238: conv.v.b
0000023C: bf 0x21EEE28
00000240: push.global.v global.hc
00000248: push.imm.e 0
0000024C: cmp.i.v ==
00000250: bf 0x21EEDFC
00000254: push.imm.e 400
00000258: pop.v.i sprite_index
00000260: push.global.v global.hc
00000268: push.imm.e 1
0000026C: cmp.i.v ==
00000270: bf 0x21EEE1C
00000274: push.imm.e 403
00000278: pop.v.i sprite_index
00000280: push.imm.e 1
00000284: pop.v.i cambiato
0000028C: push.imm.e 0
00000290: conv.i.v
00000294: push.imm.e 1
00000298: conv.i.v
0000029C: push.v cambiato
000002A4: call action_if_variable(argc=3)
000002AC: pop.v.v local.__b__
000002B4: push.local.v local.__b__
000002BC: conv.v.b
000002C0: bf 0x21EEEA0
000002C4: push.global.v global.hc
000002CC: push.imm.e 0
000002D0: cmp.i.v ==
000002D4: bf 0x21EEE80
000002D8: push.imm.e 400
000002DC: pop.v.i sprite_index
000002E4: push.global.v global.hc
000002EC: push.imm.e 1
000002F0: cmp.i.v ==
000002F4: bf 0x21EEEA0
000002F8: push.imm.e 403
000002FC: pop.v.i sprite_index
00000304: push.imm.e 156
00000308: pushenv 0x21EEEE4
0000030C: push.imm.e 2
00000310: conv.i.v
00000314: push.imm.e 0
00000318: conv.i.v
0000031C: push.v biotech
00000324: call action_if_variable(argc=3)
0000032C: pop.v.v local.__b__
00000334: push.local.v local.__b__
0000033C: conv.v.b
00000340: bf 0x21EEEE4
00000344: b 0x21EEEEC
00000348: popenv 0x41EEEA8
0000034C: b 0x21EEEF0
00000350: popenv 0x1DEEEEC
00000354: push.local.v local.__b__
0000035C: conv.v.b
00000360: bf 0x21EEF84
00000364: push.imm.e 2
00000368: conv.i.v
0000036C: push.imm.e 0
00000370: conv.i.v
00000374: push.imm.e 483
00000378: conv.i.v
0000037C: call action_if_number(argc=3)
00000384: pop.v.v local.__b__
0000038C: push.local.v local.__b__
00000394: conv.v.b
00000398: bf 0x21EEF84
0000039C: push.global.v global.hc
000003A4: push.imm.e 0
000003A8: cmp.i.v ==
000003AC: bf 0x21EEF58
000003B0: push.imm.e 401
000003B4: pop.v.i sprite_index
000003BC: push.global.v global.hc
000003C4: push.imm.e 1
000003C8: cmp.i.v ==
000003CC: bf 0x21EEF78
000003D0: push.imm.e 402
000003D4: pop.v.i sprite_index
000003DC: push.imm.e 3
000003E0: pop.v.i cambiato
000003E8: push.imm.e 2
000003EC: conv.i.v
000003F0: push.imm.e 0
000003F4: conv.i.v
000003F8: push.imm.e 159
000003FC: conv.i.v
00000400: call action_if_number(argc=3)
00000408: pop.v.v local.__b__
00000410: push.local.v local.__b__
00000418: conv.v.b
0000041C: bf 0x21EF050
00000420: push.imm.e 2
00000424: conv.i.v
00000428: push.imm.e 0
0000042C: conv.i.v
00000430: push.imm.e 161
00000434: conv.i.v
00000438: call action_if_number(argc=3)
00000440: pop.v.v local.__b__
00000448: push.local.v local.__b__
00000450: conv.v.b
00000454: bf 0x21EF050
00000458: push.imm.e 1
0000045C: conv.i.v
00000460: push.imm.e 3
00000464: conv.i.v
00000468: push.v cambiato
00000470: call action_if_variable(argc=3)
00000478: pop.v.v local.__b__
00000480: push.local.v local.__b__
00000488: conv.v.b
0000048C: bf 0x21EF050
00000490: push.imm.e 156
00000494: pushenv 0x21EF040
00000498: push.imm.e 0
0000049C: pop.v.i crys
000004A4: popenv 0x41EF034
000004A8: push.imm.e 2
000004AC: pop.v.i cambiato
000004B4: push.imm.e 0
000004B8: conv.i.v
000004BC: push.imm.e 2
000004C0: conv.i.v
000004C4: push.v cambiato
000004CC: call action_if_variable(argc=3)
000004D4: pop.v.v local.__b__
000004DC: push.local.v local.__b__
000004E4: conv.v.b
000004E8: bf 0x21EF094
000004EC: push.imm.e 518
000004F0: pop.v.i sprite_index
000004F8: push.imm.e 2
000004FC: conv.i.v
00000500: push.imm.e 0
00000504: conv.i.v
00000508: push.imm.e 483
0000050C: conv.i.v
00000510: call action_if_number(argc=3)
00000518: pop.v.v local.__b__
00000520: push.local.v local.__b__
00000528: conv.v.b
0000052C: bf 0x21EF0D8
00000530: push.imm.e 518
00000534: pop.v.i sprite_index