// gml_Object_crysrepre_Draw_64  locals=2 args=0 len=644
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 4
0000000C: conv.i.v
00000010: push.builtin.v os_type
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x21EE94C
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.imm.e 2
0000004C: conv.i.v
00000050: push.imm.e 2
00000054: conv.i.v
00000058: call display_set_gui_maximise(argc=4)
00000060: popz
00000064: push.imm.e 0
00000068: conv.i.v
0000006C: push.imm.e 2
00000070: conv.i.v
00000074: call action_font(argc=2)
0000007C: popz
00000080: push.imm.e 0
00000084: conv.i.v
00000088: push.imm.e 0
0000008C: conv.i.v
00000090: push.global.v global.hc
00000098: call action_if_variable(argc=3)
000000A0: pop.v.v local.__b__
000000A8: push.local.v local.__b__
000000B0: conv.v.b
000000B4: bf 0x21EE9B4
000000B8: push.imm.e 0
000000BC: conv.i.v
000000C0: call action_color(argc=1)
000000C8: popz
000000CC: push.imm.e 0
000000D0: conv.i.v
000000D4: push.imm.e 1
000000D8: conv.i.v
000000DC: push.global.v global.hc
000000E4: call action_if_variable(argc=3)
000000EC: pop.v.v local.__b__
000000F4: push.local.v local.__b__
000000FC: conv.v.b
00000100: bf 0x21EEA04
00000104: push.i 16777215
0000010C: conv.i.v
00000110: call action_color(argc=1)
00000118: popz
0000011C: push.imm.e 735
00000120: pushenv 0x21EEA48
00000124: push.imm.e 0
00000128: conv.i.v
0000012C: push.imm.e 1
00000130: conv.i.v
00000134: push.v cambiato
0000013C: call action_if_variable(argc=3)
00000144: pop.v.v local.__b__
0000014C: push.local.v local.__b__
00000154: conv.v.b
00000158: bf 0x21EEA48
0000015C: b 0x21EEA50
00000160: popenv 0x41EEA0C
00000164: b 0x21EEA54
00000168: popenv 0x1DEEA50
0000016C: push.local.v local.__b__
00000174: conv.v.b
00000178: bf 0x21EEA9C
0000017C: push.imm.e 156
00000180: pushenv 0x21EEA98
00000184: push.imm.e 85
00000188: push.global.v global.upp
00000190: add.v.i
00000194: push.imm.e 40
00000198: conv.i.v
0000019C: push.v crys
000001A4: call action_draw_variable(argc=3)
000001AC: popz
000001B0: popenv 0x41EEA6C
000001B4: push.imm.e 735
000001B8: pushenv 0x21EEAE0
000001BC: push.imm.e 0
000001C0: conv.i.v
000001C4: push.imm.e 3
000001C8: conv.i.v
000001CC: push.v cambiato
000001D4: call action_if_variable(argc=3)
000001DC: pop.v.v local.__b__
000001E4: push.local.v local.__b__
000001EC: conv.v.b
000001F0: bf 0x21EEAE0
000001F4: b 0x21EEAE8
000001F8: popenv 0x41EEAA4
000001FC: b 0x21EEAEC
00000200: popenv 0x1DEEAE8
00000204: push.local.v local.__b__
0000020C: conv.v.b
00000210: bf 0x21EEB6C
00000214: push.imm.e 0
00000218: conv.i.v
0000021C: push.imm.e 0
00000220: conv.i.v
00000224: push.imm.e 483
00000228: conv.i.v
0000022C: call action_if_number(argc=3)
00000234: pop.v.v local.__b__
0000023C: push.local.v local.__b__
00000244: conv.v.b
00000248: bf 0x21EEB6C
0000024C: push.imm.e 156
00000250: pushenv 0x21EEB68
00000254: push.imm.e 85
00000258: push.global.v global.upp
00000260: add.v.i
00000264: push.imm.e 40
00000268: conv.i.v
0000026C: push.v biotech
00000274: call action_draw_variable(argc=3)
0000027C: popz
00000280: popenv 0x41EEB3C